/** レスポンス定義 */
export type ResponseType<T> = {
  status: number;
  body?: T;
};
/** レスポンス定義：ログイン */
export type ResponseLogin = {
  accessToken: string;
  expired: string;
};
/** レスポンス定義：ユーザー取得 */
export type UserGet = {
  userId: number;
  userName: string;
};
/** レスポンス定義：ユーザー作成 */
export type UserCreate = {
  userId: number;
};
/** レスポンス定義：ユーザー削除 */
export type UserDelete = never;
/** レスポンス定義：ヘルスチェック */
export type HealthCheck = {
  health: string;
};
/** レスポンス定義：エラー */
export type ResponseError = {
  error: {
    code: number;
    message: string;
  };
};
