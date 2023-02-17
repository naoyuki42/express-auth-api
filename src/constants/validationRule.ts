import { Schema } from "express-validator";

/** バリデーションルール：ログイン */
export const Login: Schema = {
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
export const UserGet: Schema = {
  userId: {
    in: ["params"],
    isInt: true,
  },
};
/** バリデーションルール：ユーザー作成 */
export const UserCreate: Schema = {
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
export const UserDelete: Schema = {
  userId: {
    in: ["params"],
    isInt: true,
  },
};
