import { compare } from "bcrypt";
import { UNAUTHORIZED } from "../../constants/Message";

export class AuthService {
  /** パスワードの比較 */
  async comparePassword(
    requestPassword: string,
    dbPassword: string
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // パスワードの検証
      const isCompared = await compare(requestPassword, dbPassword);
      if (!isCompared) reject(new Error(UNAUTHORIZED));
      resolve();
    });
  }

  /** 認証の実行 */
  async authenticate(isLogout: Boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isLogout) reject(new Error(UNAUTHORIZED));
      resolve();
    });
  }
}
