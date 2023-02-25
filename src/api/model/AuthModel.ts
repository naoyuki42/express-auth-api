import { PrismaClient } from "@prisma/client";
import { resolve } from "path";
import { Context } from "../../config/context";
import { NOT_UNIQUE_NAME, UNAUTHORIZED } from "../../constants/Message";

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
    resolve();
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
    resolve();
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
    // ユーザー作成
    await this.prisma.user.create({
      data: {
        name: userName,
        password: password,
      },
    });
    resolve();
  }

  /** ユーザー名更新 */
  async updateName(
    oldName: string,
    newName: string
  ): Promise<{ name: string }> {
    /**
     * NOTE:
     * ユーザー名の変更によってJWTトークンが使用出来なくなるため、
     * ユーザーの更新処理時にはログアウトフラグをtrueにする
     * */
    // ユーザー名の更新
    const result = await this.prisma.user.update({
      select: {
        name: true,
      },
      where: {
        name: oldName,
      },
      data: {
        name: newName,
        isLogout: true,
      },
    });
    return result;
  }

  /** パスワード更新 */
  async updatePassword(userName: string, password: string): Promise<void> {
    // ユーザー名の更新
    await this.prisma.user.update({
      where: {
        name: userName,
      },
      data: {
        password: password,
        isLogout: true,
      },
    });
    resolve();
  }

  /** 退会 */
  async userDelete(userName: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        name: userName,
      },
    });
    resolve();
  }

  /** ユーザー名が一意かの検証 */
  async verifyUniqueName(userName: string): Promise<void> {
    // ユーザー名で検索
    const user = await this.prisma.user.findUnique({
      where: {
        name: userName,
      },
    });
    // ユーザー名が一意でなかった場合エラー
    if (user !== null) throw new Error(NOT_UNIQUE_NAME);
    resolve();
  }
}
