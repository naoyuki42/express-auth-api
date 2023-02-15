import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";

import { AuthModel } from "../../model/AuthModel";
import { TokenService } from "../../service/TokenService";

import { TOKEN_EXPIRES_IN } from "../../../config/env";
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
};
