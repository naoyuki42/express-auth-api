/** ユーザー取得 */
export const QUERY_USER_GET = "SELECT id, name FROM user WHERE id = ?";
/** ユーザー取得（ログイン） */
export const QUERY_USER_GET_LOGIN =
  "SELECT id, password FROM user WHERE name = ?";
/** ユーザー取得（トークンのみ） */
export const QUERY_USER_GET_TOKEN = "SELECT token FROM user WHERE name = ?";
/** ユーザー作成 */
export const QUERY_USER_CREATE =
  "INSERT INTO user (name, password, token) VALUES (?, ?, NULL)";
/** ユーザー更新（ログイン） */
export const QUERY_USER_PUT_LOGIN = "UPDATE user SET token = ? WHERE id = ?";
/** ユーザー更新（ログアウト） */
export const QUERY_USER_PUT_LOGOUT =
  "UPDATE user SET token = NULL WHERE name = ?";
