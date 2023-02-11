import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, TOKEN_EXPIRES_IN } from "../../../../config/env";

export const createToken = async (userName: string): Promise<string> => {
  const payload = {
    user: userName,
  };
  const option = {
    expiresIn: TOKEN_EXPIRES_IN,
  };
  const token = await jwt.sign(payload, JWT_SECRET_KEY, option);
  return token;
};
