import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

import { verifyToken } from "../../common/token/verifyToken";
import { subStringToken } from "../../common/token/subStringToken";
import { getTokenModel } from "./model";
import { FORBIDDEN } from "../../constants/Message";

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
    const token = await getTokenModel(userName).then((result) => {
      if (result !== undefined) {
        if ("token" in result) {
          return result.token;
        }
      }
      throw new JsonWebTokenError(FORBIDDEN);
    });
    // リクエスト内のアクセストークンとDBに保存されているアクセストークンの検証
    if (accessToken === token) {
      next();
    } else {
      throw new JsonWebTokenError(FORBIDDEN);
    }
  } catch (err) {
    next(err);
  }
};
