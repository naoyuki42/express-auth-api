import Express from "express";

import { router } from "./router";

// TODO:テストコードの追加
// TODO:Userのリレーションテーブルの追加
// TODO:paginationのAPIの追加
// TODO:パスワード変更APIの追加
// TODO:ユーザー名変更APIの追加

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

export default app;
