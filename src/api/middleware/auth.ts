import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

import { AuthModel } from "../model/AuthModel";
import { TokenService } from "../service/TokenService";

import { FORBIDDEN } from "../../constants/Message";

/** ミドルウェア：認証 */
export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const Auth = new AuthModel();
  const Token = new TokenService();
  try {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await Token.subString(req.headers.authorization);
    // アクセストークンを抽出出来なかった場合エラー
    if (accessToken === undefined) throw new Error();

    // アクセストークンのデコード
    const decoded = await Token.verify(accessToken);
    // デコード結果が文字列または"user"キーが存在しない場合エラー
    if (typeof decoded === "string" || !("user" in decoded)) throw new Error();

    // DBからアクセストークンの取得
    const result = await Auth.getToken(decoded.user);
    // DBからアクセストークンが取得出来なかったらエラー
    if (result === null) throw new JsonWebTokenError(FORBIDDEN);

    // アクセストークンが一致しない場合エラー
    if (accessToken !== result.token) throw new JsonWebTokenError(FORBIDDEN);

    // 認証の成功
    next();
  } catch (err) {
    next(err);
  }
};
