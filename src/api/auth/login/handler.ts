import { Request, Response } from "express";

import { createToken } from "./service/createToken";
import { TOKEN_EXPIRES_IN } from "../../../config/env";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_SERVER_ERROR,
} from "../../../constants/HTTPStatus";
import { SERVER_ERROR } from "../../../constants/Message";
import { ResponseLogin, ResponseError } from "../../../types/response";

export const loginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // TODO:今はログインユーザー全てを認証しているので、検証可能にする
    const token = await createToken(req.body.userName);
    const response: ResponseLogin = {
      accessToken: token,
      expired: TOKEN_EXPIRES_IN,
    };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    console.error(err);
    const response: ResponseError = {
      code: HTTP_STATUS_SERVER_ERROR,
      message: SERVER_ERROR,
    };
    res.status(HTTP_STATUS_SERVER_ERROR).json(response);
  }
};
