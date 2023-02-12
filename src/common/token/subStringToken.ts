import { JsonWebTokenError } from "jsonwebtoken";

import { AUTH_TOKEN_TYPE } from "../../config/env";
import { FORBIDDEN } from "../../constants/Message";

export const subStringToken = (
  authHeader: string | undefined
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Authorizationヘッダーがない場合エラー
    if (authHeader === undefined) {
      reject(new JsonWebTokenError(FORBIDDEN));
    } else {
      // トークンがBearerトークンではない場合エラー
      if (authHeader.split(" ")[0] !== AUTH_TOKEN_TYPE) {
        reject(new JsonWebTokenError(FORBIDDEN));
      } else {
        const token = authHeader.split(" ")[1];
        resolve(token);
      }
    }
  });
};
