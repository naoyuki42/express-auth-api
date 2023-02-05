import jwt from "jsonwebtoken";

import Config from "../config/config";

export const createToken = (userName: string): string => {
  const payload = {
    user: userName,
  };
  const option = {
    expiresIn: Config.EXPIRES_IN,
  };
  const token = jwt.sign(payload, Config.JWT_SECRET_KEY, option);
  return token;
};
