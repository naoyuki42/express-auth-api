import { verify, JwtPayload } from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../../config/env";
import { FORBIDDEN } from "../../constants/Message";

export const verifyToken = async (
  token: string
): Promise<string | JwtPayload> => {
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (!err) {
        if (decoded !== undefined) {
          resolve(decoded);
        } else {
          reject(new Error(FORBIDDEN));
        }
      } else {
        reject(err);
      }
    });
  });
};
