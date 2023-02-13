/** ライブラリ */
import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
/** クラス */
import { AuthModel } from "../model/AuthModel";
import { TokenService } from "../service/TokenService";
/** 定数 */
import { TOKEN_EXPIRES_IN } from "../../config/env";
import {
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../../constants/HTTPStatus";
import { UNAUTHORIZED } from "../../constants/Message";
/** 型 */
import { ResponseLogin } from "../../types/response";

export class AuthController {
  /** ログイン */
  async loginHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const Auth = new AuthModel();
    const Token = new TokenService();
    try {
      // ログインユーザー情報の取得
      const { id, password } = await Auth.getAuthUser(req.body.userName)
        .then((result) => {
          if (result !== undefined && "id" && "password" in result) {
            return result;
          }
          throw new Error(UNAUTHORIZED);
        })
        .catch((err) => {
          throw err;
        });
      // パスワードの検証
      const isPasswordCompare = await compare(req.body.password, password);
      if (!isPasswordCompare) throw new Error(UNAUTHORIZED);
      // アクセストークンの発行
      const token = await Token.create(req.body.userName);
      // アクセストークンの保存
      await Auth.setToken(id, token);
      const response: ResponseLogin = {
        accessToken: token,
        expired: TOKEN_EXPIRES_IN,
      };
      res.status(HTTP_STATUS_OK).json(response);
    } catch (err: unknown) {
      next(err);
    }
  }
  /** ログアウト */
  async logoutHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const Auth = new AuthModel();
    const Token = new TokenService();
    try {
      // Authorizationヘッダーからアクセストークンを抽出
      const accessToken = await Token.subString(
        req.headers.authorization
      ).catch((err) => {
        throw err;
      });
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
  }
}
