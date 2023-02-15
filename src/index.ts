import Express from "express";

import { PORT } from "./env";
import { router } from "./router";

// TODO:バリデーションのミドルウェアの追加
// TODO:テストコードの追加
// TODO:論理削除に変更
// TODO:passportの導入
// TODO:インポートを絶対パスに修正

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`App Listening on Port:${PORT}`));
