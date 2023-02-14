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
  Auth: AuthModel;
  Token: TokenService;

  constructor() {
    this.Auth = new AuthModel();
    this.Token = new TokenService();
  }

  /** ログイン */
  async loginHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // ログインユーザー情報の取得
      const { id, password } = await this.Auth.getAuthUser(req.body.userName)
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
      const token = await this.Token.create(req.body.userName);
      // アクセストークンの保存
      await this.Auth.setToken(id, token);
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
    try {
      // Authorizationヘッダーからアクセストークンを抽出
      const accessToken = await this.Token.subString(
        req.headers.authorization
      ).catch((err) => {
        throw err;
      });
      // アクセストークンのデコード
      const userName = await this.Token.verify(accessToken)
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
      await this.Auth.logout(userName);
      res.status(HTTP_STATUS_NO_CONTENT).json();
    } catch (err: unknown) {
      next(err);
    }
  }
}
