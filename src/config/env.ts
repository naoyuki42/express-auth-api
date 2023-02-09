import "dotenv/config";

/** Webサーバーポート */
export const PORT = process.env.PORT;

/** DBサーバーホスト */
export const DB_HOST = String(process.env.DB_HOST);
/** DBサーバーポート */
export const DB_PORT = Number(process.env.DB_PORT);
/** DBユーザー */
export const DB_USER = String(process.env.DB_USER);
/** DBパスワード */
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
/** DBデータベース */
export const DB_DATABASE = String(process.env.DB_DATABASE);

/** 認証トークンのタイプ */
export const AUTH_TOKEN_TYPE = String(process.env.AUTH_TOKEN_TYPE);
/** JWTトークン生成用の秘密鍵 */
export const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY);
/** JWTトークンの有効期限（分） */
export const TOKEN_EXPIRES_IN = String(process.env.TOKEN_EXPIRES_IN);
