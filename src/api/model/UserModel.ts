import { PrismaClient, User } from "@prisma/client";
import { USER_NOT_FOUND } from "../../constants/Message";
import { Context } from "../../context";

export class UserModel {
  prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  /** ユーザーの取得 */
  async get(userId: number): Promise<User> {
    const result = await this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .catch((err) => {
        throw err;
      });
    // クエリの結果がNULLの場合エラー
    if (result === null) throw new Error(USER_NOT_FOUND);
    return result;
  }
  /** ユーザーの作成 */
  async create(userName: string, password: string): Promise<User> {
    const result = await this.prisma.user
      .create({
        data: {
          name: userName,
          password: password,
        },
      })
      .catch((err) => {
        throw err;
      });
    return result;
  }
  /** ユーザーの削除 */
  async delete(userId: number): Promise<User> {
    const result = await this.prisma.user
      .delete({
        where: {
          id: userId,
        },
      })
      .catch((err) => {
        throw err;
      });
    return result;
  }
}
