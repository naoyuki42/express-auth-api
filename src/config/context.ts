import { PrismaClient } from "@prisma/client";

/** コンテキストの型 */
export type Context = {
  prisma: PrismaClient;
};
/** コンテキストの作成 */
export const createContext = (): Context => {
  return {
    prisma: new PrismaClient(),
  };
};
