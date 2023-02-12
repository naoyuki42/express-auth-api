import Express from "express";

import { PORT } from "./config/env";
import { router } from "./router";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`App Listening on Port:${PORT}`));
