import { createToken } from "../auth/createToken";

import Config from "../config/config";

import { LoginRequest } from "../types/request/login";
import { LoginResponse } from "../types/response/login";

export const LoginHandler = (request: LoginRequest): LoginResponse => {
  // TODO:今はログインユーザー全てを認証しているので、いつか検証可能にする
  const token = createToken(request.userName);
  const response: LoginResponse = {
    accessToken: token,
    expired: Config.EXPIRES_IN,
  };
  return response;
};
