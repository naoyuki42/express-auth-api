import { PrismaClient, User } from "@prisma/client";
import { Context } from "../../context";
import { UNAUTHORIZED } from "../../constants/Message";

export class AuthModel {
  prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  /** 認証用ユーザー情報の取得 */
  async getAuthUser(userName: string): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        name: userName,
      },
    });
    // クエリの結果がNULLの場合エラー
    if (result === null) throw new Error(UNAUTHORIZED);
    return result;
  }
  /** トークンの保存 */
  async setToken(userId: number, token: string): Promise<User> {
    const result = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token: token,
      },
    });
    return result;
  }
  /** トークンの取得 */
  async getToken(userName: string): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        name: userName,
      },
    });
    // クエリの結果がNULLの場合エラー
    if (result === null) throw new Error(UNAUTHORIZED);
    return result;
  }
  /** ログアウト（トークンの削除） */
  async logout(userName: string): Promise<User> {
    const result = await this.prisma.user.update({
      where: {
        name: userName,
      },
      data: {
        token: null,
      },
    });
    return result;
  }
}
