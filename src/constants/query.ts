/** ユーザー取得 */
export const QUERY_USER_GET = "SELECT id, name FROM users WHERE id = ?";
/** ユーザー作成 */
export const QUERY_USER_CREATE =
  "INSERT INTO users (name, password) VALUES (?, ?)";
