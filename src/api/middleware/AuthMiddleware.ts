/** ライブラリ */
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
/** クラス */
import { AuthModel } from "../model/AuthModel";
import { TokenService } from "../service/TokenService";
/** 定数 */
import { FORBIDDEN } from "../../constants/Message";

export class AuthMiddleware {
  Auth: AuthModel;
  Token: TokenService;

  constructor() {
    this.Auth = new AuthModel();
    this.Token = new TokenService();
  }
  /** 認証ミドルウェア */
  async authenticate(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Authorizationヘッダーからアクセストークンを抽出
      const accessToken = await this.Token.subString(
        req.headers.authorization
      ).catch((err) => {
        throw err;
      });
      // アクセストークンの有効性の検証
      const userName = await this.Token.verify(accessToken)
        .then((decoded) => {
          if (typeof decoded !== "string" && "user" in decoded) {
            return decoded.user;
          }
          throw new JsonWebTokenError(FORBIDDEN);
        })
        .catch((err) => {
          throw err;
        });
      // DBからアクセストークンの取得
      const token = await this.Auth.getToken(userName).then((result) => {
        if (result !== undefined) {
          if ("token" in result) {
            return result.token;
          }
        }
        throw new JsonWebTokenError(FORBIDDEN);
      });
      // リクエスト内のアクセストークンとDBに保存されているアクセストークンの検証
      if (accessToken !== token) {
        throw new JsonWebTokenError(FORBIDDEN);
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}
