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
/** バリデーションルール：会員登録 */
export const Register: Schema = {
  userName: {
    in: ["body"],
    isAlphanumeric: true,
  },
  password: {
    in: ["body"],
    isString: true,
  },
};
/** バリデーションルール：退会 */
export const UserDelete: Schema = {
  userName: {
    in: ["body"],
    isAlphanumeric: true,
  },
};
/** バリデーションルール：ユーザー取得 */
export const UserGet: Schema = {
  userId: {
    in: ["params"],
    isInt: true,
  },
};

// TODO:ユーザー名変更APIのバリデーションルールの追加
// TODO:パスワード変更APIのバリデーションルールの追加
// TODO:退会APIのバリデーションルールの追加
