import Express from "express";

import { router } from "./router";

// TODO:テストコードの追加
// TODO:paginationのAPIの追加
// TODO:ミドルウェアをまとめたい

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

export default app;
