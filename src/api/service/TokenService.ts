import { JsonWebTokenError, JwtPayload, verify, sign } from "jsonwebtoken";

import { AUTH_TOKEN_TYPE, JWT_SECRET_KEY, TOKEN_EXPIRES_IN } from "../../env";
import { FORBIDDEN } from "../../constants/Message";

export class TokenService {
  /** トークンの作成 */
  async create(userName: string): Promise<string> {
    const payload = {
      user: userName,
    };
    const option = {
      expiresIn: TOKEN_EXPIRES_IN,
    };
    const token = await sign(payload, JWT_SECRET_KEY, option);
    return token;
  }
  /** Authorizationヘッダーからトークンを切り出し */
  async subString(authHeader: string | undefined): Promise<string> {
    return new Promise((resolve, reject) => {
      // Authorizationヘッダーがない場合エラー
      if (authHeader !== undefined) {
        // トークンがBearerトークンではない場合エラー
        if (authHeader.split(" ")[0] === AUTH_TOKEN_TYPE) {
          const token = authHeader.split(" ")[1];
          resolve(token);
        }
      }
      reject(new JsonWebTokenError(FORBIDDEN));
    });
  }
  /** トークンの有効性の検証とデコード */
  async verify(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (!err) {
          if (decoded !== undefined && typeof decoded !== "string") {
            if ("user" in decoded) {
              resolve(decoded);
            }
          }
        }
        reject(new JsonWebTokenError(FORBIDDEN));
      });
    });
  }
  /** トークンの比較 */
  async compareToken(requestToken: string, dbToken: string): Promise<void> {
    if (requestToken !== dbToken) throw new JsonWebTokenError(FORBIDDEN);
  }
}
