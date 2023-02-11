/** ユーザー取得 */
export const QUERY_USER_GET = "SELECT id, name FROM user WHERE id = ?";
/** ユーザー取得（認証情報） */
export const QUERY_USER_GET_AUTH =
  "SELECT id, password FROM user WHERE name = ?";
/** ユーザー取得（トークンのみ） */
export const QUERY_USER_GET_TOKEN = "SELECT token FROM user WHERE name = ?";
/** ユーザー作成 */
export const QUERY_USER_CREATE =
  "INSERT INTO user (name, password, token) VALUES (?, ?, NULL)";
/** ユーザー更新（ログイン） */
export const QUERY_USER_PUT_AUTH = "UPDATE user SET token = ? WHERE id = ?";
