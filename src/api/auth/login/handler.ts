import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";

import { createToken } from "./service/createToken";
import { setTokenModel, userGetAuthModel } from "./model";
import { TOKEN_EXPIRES_IN } from "../../../config/env";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
} from "../../../constants/HTTPStatus";
import { SERVER_ERROR, UNAUTHORIZED } from "../../../constants/Message";
import { ResponseLogin, ResponseError } from "../../../types/response";

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
    // TODO:エラーハンドリングの共通化
    // console.error(err);
    // if (err instanceof Error && err.message === UNAUTHORIZED) {
    //   const response: ResponseError = {
    //     error: {
    //       code: HTTP_STATUS_UNAUTHORIZED,
    //       message: UNAUTHORIZED,
    //     },
    //   };
    //   res.status(HTTP_STATUS_UNAUTHORIZED).json(response);
    // } else {
    //   const response: ResponseError = {
    //     error: {
    //       code: HTTP_STATUS_SERVER_ERROR,
    //       message: SERVER_ERROR,
    //     },
    //   };
    //   res.status(HTTP_STATUS_SERVER_ERROR).json(response);
    // }
  }
};
