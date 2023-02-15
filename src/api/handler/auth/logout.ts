import { Request, Response, NextFunction } from "express";

import { AuthModel } from "../../model/AuthModel";
import { TokenService } from "../../service/TokenService";

import { HTTP_STATUS_NO_CONTENT } from "../../../constants/HTTPStatus";

/** ハンドラー：ログアウト */
export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const Auth = new AuthModel();
  const Token = new TokenService();
  try {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await Token.subString(req.headers.authorization).catch(
      (err) => {
        throw err;
      }
    );
    // アクセストークンのデコード
    const userName = await Token.verify(accessToken)
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
    await Auth.logout(userName);
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
