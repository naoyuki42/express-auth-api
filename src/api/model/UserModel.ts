import { PrismaClient, User } from "@prisma/client";
import { USER_NOT_FOUND } from "../../constants/Message";
import { Context } from "../../config/context";

export class UserModel {
  prisma: PrismaClient;

  constructor(context: Context) {
    this.prisma = context.prisma;
  }

  /** ユーザーの取得 */
  async get(userId: number): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    // クエリの結果がNULLの場合エラー
    if (result === null) throw new Error(USER_NOT_FOUND);
    return result;
  }
}
