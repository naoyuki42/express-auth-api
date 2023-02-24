/** レスポンス定義：ログイン */
export type ResponseTypeLogin = {
  accessToken: string;
  expired: string;
};
/** レスポンス定義：ログアウト */
export type ResponseTypeLogout = void;
/** レスポンス定義：会員登録 */
export type ResponseTypeRegister = void;
/** レスポンス定義：ユーザー名変更 */
export type ResponseTypeChangeUserName = {
  userName: string;
};
/** レスポンス定義：パスワード変更 */
export type ResponseTypeChangePassword = void;
/** レスポンス定義：退会 */
export type ResponseTypeUserDelete = void;
/** レスポンス定義：ユーザー取得 */
export type ResponseTypeUserGet = {
  userId: number;
  userName: string;
};
/** レスポンス定義：ヘルスチェック */
export type ResponseTypeHealthCheck = {
  health: string;
};
/** レスポンス定義：エラー */
export type ResponseTypeError = {
  error: {
    code: number;
    message: string;
  };
};
