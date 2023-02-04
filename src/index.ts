import Express from "express";
import Config from "./config/config";
import routes from "./routes";
import database from "./config/database";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api", routes);

database.connect((err: any) => {
  if (err) throw err;
  console.log("DB Connected");
});

app.listen(Config.PORT, () =>
  console.log(`App Listening on Port:${Config.PORT}`)
);
