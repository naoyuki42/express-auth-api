/** レスポンス定義：ログイン */
export type ResponseLogin = {
  accessToken: string;
  expired: string;
};
/** レスポンス定義：ユーザー取得 */
export type ResponseUserGet = {
  userId: number;
  userName: string;
};
/** レスポンス定義：ユーザー作成 */
export type ResponseUserCreate = {
  userId: number;
};
/** レスポンス定義：エラー */
export type ResponseError = {
  code: number;
  message: string;
};
/** レスポンス定義：ヘルスチェック */
export type ResponseHealthCheck = {
  health: string;
};
