import Express from "express";

import router from "./router";
import { PORT } from "./config/env";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`App Listening on Port:${PORT}`));
