import { Schema } from "express-validator";

/** バリデーションルール：ログイン */
export const LoginSchema: Schema = {
  userName: {
    in: ["body"],
    isAlphanumeric: true,
  },
  password: {
    in: ["body"],
    isString: true,
  },
};
/** バリデーションルール：ユーザー取得 */
export const UserGetSchema: Schema = {
  userId: {
    in: ["params"],
    isInt: true,
  },
};
/** バリデーションルール：ユーザー作成 */
export const UserCreateSchema: Schema = {
  userName: {
    in: ["body"],
    isAlphanumeric: true,
  },
  password: {
    in: ["body"],
    isString: true,
  },
};
/** バリデーションルール：ユーザー削除 */
export const UserDeleteSchema: Schema = {
  userId: {
    in: ["params"],
    isInt: true,
  },
};
