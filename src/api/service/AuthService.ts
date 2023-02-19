import { compare } from "bcrypt";
import { UNAUTHORIZED } from "../../constants/Message";

export class AuthService {
  /** パスワードの比較 */
  async comparePassword(
    requestPassword: string,
    dbPassword: string
  ): Promise<void> {
    // パスワードの検証
    const isCompared = await compare(requestPassword, dbPassword);
    if (!isCompared) throw new Error(UNAUTHORIZED);
  }
}
