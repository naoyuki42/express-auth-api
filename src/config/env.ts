import "dotenv/config";

/** Webサーバーポート */
export const PORT = process.env.PORT;
/** 認証トークンのタイプ */
export const AUTH_TOKEN_TYPE = String(process.env.AUTH_TOKEN_TYPE);
/** JWTトークン生成用の秘密鍵 */
export const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY);
/** JWTトークンの有効期限（分） */
export const TOKEN_EXPIRES_IN = String(process.env.TOKEN_EXPIRES_IN);
/** パスワードハッシュ化の回数 */
export const HASHED_SALT_ROUNDS = Number(process.env.HASHED_SALT_ROUNDS);
