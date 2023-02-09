import Express from "express";

import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";
import { createToken } from "./service/createToken";
import { TOKEN_EXPIRES_IN } from "../../../config/env";

export const loginHandler = (
  req: Express.Request,
  res: Express.Response
): void => {
  // TODO:今はログインユーザー全てを認証しているので、検証可能にする
  const token = createToken(req.body.userName);
  const response = {
    accessToken: token,
    expired: TOKEN_EXPIRES_IN,
  };
  res.status(HTTP_STATUS_OK).json(response);
};
