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

// TODO:会員登録APIのバリデーションルールの追加
// TODO:ユーザー名変更APIのバリデーションルールの追加
// TODO:パスワード変更APIのバリデーションルールの追加
// TODO:退会APIのバリデーションルールの追加
