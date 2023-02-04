import mysql2 from "mysql2";
import Config from "./config";

const database = mysql2.createConnection({
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  user: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_DATABASE,
});

export default database;
