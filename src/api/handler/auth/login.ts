import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";

import { AuthModel } from "../../model/AuthModel";
import { TokenService } from "../../service/TokenService";

import { TOKEN_EXPIRES_IN } from "../../../env";
import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";
import { UNAUTHORIZED } from "../../../constants/Message";

import { ResponseLogin } from "../../../types/response";

/** ハンドラー：ログイン */
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const Auth = new AuthModel();
  const Token = new TokenService();
  try {
    // ログインユーザー情報の取得
    const authUser = await Auth.getAuthUser(req.body.userName);
    // ログインユーザーが取得出来なかった場合エラー
    if (authUser === null) throw new Error(UNAUTHORIZED);

    // パスワードの検証
    const isPasswordCompare = await compare(
      req.body.password,
      authUser.password
    );
    // パスワードが一致しなかった場合エラー
    if (!isPasswordCompare) throw new Error(UNAUTHORIZED);

    // アクセストークンの発行
    const token = await Token.create(req.body.userName);
    // アクセストークンの保存
    const setTokenResult = await Auth.setToken(authUser.id, token);
    // アクセストークンを保存出来なかった場合エラー
    if (setTokenResult === null) throw new Error(UNAUTHORIZED);

    // レスポンス
    const response: ResponseLogin = {
      accessToken: token,
      expired: TOKEN_EXPIRES_IN,
    };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
