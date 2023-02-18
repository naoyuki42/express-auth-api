import { PrismaClient, User } from "@prisma/client";

export class UserModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /** ユーザーの取得 */
  async get(userId: number): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return result;
  }
  /** ユーザーの作成 */
  async create(userName: string, password: string): Promise<User | null> {
    const result = await this.prisma.user.create({
      data: {
        name: userName,
        password: password,
      },
    });
    return result;
  }
  /** ユーザーの削除 */
  async delete(userId: number): Promise<User | null> {
    const result = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return result;
  }
}
