import Express from "express";

import { router } from "./router";

// TODO:テストコードの追加
// TODO:paginationのAPIの追加
// TODO:ミドルウェアをまとめたい
// TODO:エラー判定処理をコントローラーからモデル、サービスに移植

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

export default app;
