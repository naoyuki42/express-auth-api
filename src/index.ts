import Express from "express";
import { PORT } from "./constants";
import routes from "./routes";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(PORT, (): void => console.log(`App Listening on Port:${PORT}`));
