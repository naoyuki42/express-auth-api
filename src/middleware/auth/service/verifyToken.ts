import { JwtPayload, verify } from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../../../config/env";

export const verifyToken = async (
  token: string
): Promise<JwtPayload | string> => {
  // JWTトークンの検証
  const decoded = await verify(token, JWT_SECRET_KEY);
  return decoded;
};
