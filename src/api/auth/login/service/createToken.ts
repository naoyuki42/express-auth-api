import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, TOKEN_EXPIRES_IN } from "../../../../config/env";

export const createToken = (userName: string): string => {
  const payload = {
    user: userName,
  };
  const option = {
    expiresIn: TOKEN_EXPIRES_IN,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, option);
  return token;
};
