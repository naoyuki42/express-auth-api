import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";

import { createToken } from "./service/createToken";
import { setTokenModel, userGetAuthModel } from "./model";
import { TOKEN_EXPIRES_IN } from "../../../config/env";
import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";
import { UNAUTHORIZED } from "../../../constants/Message";
import { ResponseLogin } from "../../../types/response";

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // ログインユーザー情報の取得
    const { id, password } = await userGetAuthModel(req.body.userName);
    // パスワードの検証
    const isPasswordCompare = await compare(req.body.password, password);
    if (!isPasswordCompare) throw new Error(UNAUTHORIZED);
    // アクセストークンの発行
    const token = await createToken(req.body.userName);
    // アクセストークンの保存
    await setTokenModel(id, token);
    const response: ResponseLogin = {
      accessToken: token,
      expired: TOKEN_EXPIRES_IN,
    };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
