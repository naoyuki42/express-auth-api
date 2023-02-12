import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS_NO_CONTENT } from "../../../constants/HTTPStatus";
import { subStringToken } from "../../../common/token/subStringToken";
import { verifyToken } from "../../../common/token/verifyToken";
import { logoutModel } from "./model";

export const logoutHandler = async (
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
    // アクセストークンのデコード
    const userName = await verifyToken(accessToken)
      .then((decoded) => {
        if (typeof decoded !== "string" && "user" in decoded) {
          return decoded.user;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        throw err;
      });
    // DBからアクセストークンの削除
    await logoutModel(userName);
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
