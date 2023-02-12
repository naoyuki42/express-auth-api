import Express from "express";

import { PORT } from "./config/env";
import { router } from "./router";

// TODO:テストコードの追加
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`App Listening on Port:${PORT}`));
