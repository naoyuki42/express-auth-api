// TODO:.envファイルから読み込むように変更したい
const Config = {
  // Webサーバーのポート
  PORT: 3000,

  // DBサーバーのホスト
  DB_HOST: "localhost",
  // DBサーバーのポート
  DB_PORT: 3306,
  // DBサーバーのユーザー
  DB_USER: "auth",
  // DBサーバーのパスワード
  DB_PASSWORD: "auth",
  // DBサーバーのデータベース
  DB_DATABASE: "auth",

  // 認証トークンのタイプ
  AUTHORIZATION_TOKEN_TYPE: "Bearer",
  // JWTトークン生成用の秘密鍵
  JWT_SECRET_KEY: "abcdefg",
  // JWTトークンの有効期限（分）
  EXPIRES_IN: "1m",
};

export default Config;
