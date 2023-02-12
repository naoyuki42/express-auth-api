import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { verifyToken } from "../../common/token/verifyToken";
import { subStringToken } from "../../common/token/subStringToken";
import { getTokenModel } from "./model";
import {
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_SERVER_ERROR,
} from "../../constants/HTTPStatus";
import { FORBIDDEN, SERVER_ERROR } from "../../constants/Message";
import { ResponseError } from "../../types/response";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await subStringToken(req.headers.authorization).catch(
      (err) => {
        throw err;
      }
    );
    // アクセストークンの有効性の検証
    const userName = await verifyToken(accessToken)
      .then((decoded) => {
        if (typeof decoded !== "string" && "user" in decoded) {
          return decoded.user;
        } else {
          throw new JsonWebTokenError(FORBIDDEN);
        }
      })
      .catch((err) => {
        throw err;
      });
    // DBからアクセストークンの取得
    const { token } = await getTokenModel(userName);
    // リクエスト内のアクセストークンとDBに保存されているアクセストークンの検証
    if (accessToken === token) {
      next();
    } else {
      throw new JsonWebTokenError(FORBIDDEN);
    }
  } catch (err: unknown) {
    // TODO:エラーレスポンスの共通化
    console.error(err);
    if (err instanceof (JsonWebTokenError || TokenExpiredError)) {
      const response: ResponseError = {
        error: {
          code: HTTP_STATUS_FORBIDDEN,
          message: FORBIDDEN,
        },
      };
      res.status(HTTP_STATUS_FORBIDDEN).json(response);
    } else {
      const response: ResponseError = {
        error: {
          code: HTTP_STATUS_SERVER_ERROR,
          message: SERVER_ERROR,
        },
      };
      res.status(HTTP_STATUS_SERVER_ERROR).json(response);
    }
  }
};
