import Express from "express";

import routes from "./routes";

import Config from "./config/config";
import URI from "./constants/URI";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(URI.PREFIX.API, routes);

app.listen(Config.PORT, () =>
  console.log(`App Listening on Port:${Config.PORT}`)
);
