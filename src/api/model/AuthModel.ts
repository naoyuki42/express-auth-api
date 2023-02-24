import { PrismaClient } from "@prisma/client";
import { Context } from "../../config/context";
import { UNAUTHORIZED } from "../../constants/Message";

export class AuthModel {
  prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  /** ユーザーのパスワードの取得 */
  async getUser(userName: string): Promise<{ password: string }> {
    const result = await this.prisma.user.findUnique({
      select: {
        password: true,
      },
      where: {
        name: userName,
      },
    });
    // クエリの結果がNULLの場合エラー
    if (result === null) throw new Error(UNAUTHORIZED);
    return result;
  }

  /** ログイン処理（ログアウトフラグをfalseに変更） */
  async login(userName: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        name: userName,
      },
      data: {
        isLogout: false,
      },
    });
  }

  /** ログアウト処理（ログアウトフラグをtrueに変更） */
  async logout(userName: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        name: userName,
      },
      data: {
        isLogout: true,
      },
    });
  }

  /** ログアウト情報の取得 */
  async getIsLogout(userName: string): Promise<{ isLogout: Boolean }> {
    const result = await this.prisma.user.findUnique({
      select: {
        isLogout: true,
      },
      where: {
        name: userName,
      },
    });
    // クエリの結果がNULLの場合エラー
    if (result === null) throw new Error(UNAUTHORIZED);
    return result;
  }

  /** 会員登録 */
  async register(userName: string, password: string): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: userName,
        password: password,
      },
    });
  }

  /** 退会 */
  async userDelete(userName: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        name: userName,
      },
    });
  }
}
