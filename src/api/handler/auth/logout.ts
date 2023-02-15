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
    const accessToken = await Token.subString(req.headers.authorization);
    // アクセストークンを抽出出来なかった場合エラー
    if (accessToken === undefined) throw new Error();

    // アクセストークンのデコード
    const decoded = await Token.verify(accessToken);
    // デコード結果が文字列または"user"キーが存在しない場合エラー
    if (typeof decoded === "string" || !("user" in decoded)) throw new Error();

    // DBからアクセストークンの削除
    const logoutUser = await Auth.logout(decoded.user);
    // アクセストークンを削除出来なかった場合、エラー
    if (logoutUser === null) throw new Error();

    // レスポンス
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
