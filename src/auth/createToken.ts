import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY, EXPIRES_IN } from "../constants";

export const createToken = (userName: string): string => {
  const payload = {
    user: userName,
  };
  const option = {
    expiresIn: EXPIRES_IN,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, option);
  return token;
};
