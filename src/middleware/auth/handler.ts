import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";

import { AUTH_TOKEN_TYPE, JWT_SECRET_KEY } from "../../config/env";
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
    // TODO:リファクタリング
    // Authorizationヘッダーがない場合エラー
    if (typeof req.headers.authorization !== "string")
      throw new Error(FORBIDDEN);
    // トークンがBearerトークンではない場合エラー
    if (req.headers.authorization.split(" ")[0] !== AUTH_TOKEN_TYPE)
      throw new Error(FORBIDDEN);
    // Authorizationヘッダーからトークンの値を抽出
    const token = req.headers.authorization.split(" ")[1];
    // アクセストークンの有効性の検証
    const decoded = await verify(token, JWT_SECRET_KEY, (err) => {
      if (err) throw err;
    });
    // TODO:アクセストークンがDBに保存されているか検証
    next();
  } catch (err: unknown) {
    // TODO:エラーレスポンスの共通化
    console.error(err);
    if (err instanceof Error && err.message === FORBIDDEN) {
      const response: ResponseError = {
        code: HTTP_STATUS_FORBIDDEN,
        message: FORBIDDEN,
      };
      res.status(HTTP_STATUS_FORBIDDEN).json(response);
    } else if (err instanceof (JsonWebTokenError || TokenExpiredError)) {
      const response: ResponseError = {
        code: HTTP_STATUS_FORBIDDEN,
        message: FORBIDDEN,
      };
      res.status(HTTP_STATUS_FORBIDDEN).json(response);
    } else {
      const response: ResponseError = {
        code: HTTP_STATUS_SERVER_ERROR,
        message: SERVER_ERROR,
      };
      res.status(HTTP_STATUS_SERVER_ERROR).json(response);
    }
  }
};
