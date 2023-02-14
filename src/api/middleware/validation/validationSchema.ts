import { Schema } from "express-validator";

/** バリデーションルール：ログイン */
export const LoginRuleSchema: Schema = {
  userName: {
    in: ["body"],
    isAlphanumeric: true,
  },
  password: {
    in: ["body"],
    isAlphanumeric: true,
  },
};
/** バリデーションルール：ログアウト */
export const LogoutRuleSchema: Schema = {};
/** バリデーションルール：ユーザー取得 */
export const UserGetRuleSchema: Schema = {};
/** バリデーションルール：ユーザー作成 */
export const UserCreateRuleSchema: Schema = {};
/** バリデーションルール：ユーザー削除 */
export const UserDeleteRuleSchema: Schema = {};
