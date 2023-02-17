/** レスポンス定義：ログイン */
export type ResponseTypeLogin = {
  accessToken: string;
  expired: string;
};
/** レスポンス定義：ログアウト */
export type ResponseTypeLogout = void;
/** レスポンス定義：ユーザー取得 */
export type ResponseTypeUserGet = {
  userId: number;
  userName: string;
};
/** レスポンス定義：ユーザー作成 */
export type ResponseTypeUserCreate = {
  userId: number;
};
/** レスポンス定義：ユーザー削除 */
export type ResponseTypeUserDelete = void;
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
