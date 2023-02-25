import Express from "express";

import { router } from "./router";

// TODO:unitテストの追加
// TODO:integratedテストの追加
// TODO:Userに1対多でリレーションするテーブルの追加
// TODO:クエリパラメータを使用した検索のAPIの追加
// TODO:paginationのAPIの追加（オフセットとカーソの2種類）

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

export default app;
