import mysql, { RowDataPacket } from "mysql2/promise";

import database from "../../../config/database";
import { QUERY_USER_PUT_LOGOUT } from "../../../constants/Query";

export const logoutModel = async (userName: string): Promise<void> => {
  const params = [userName];
  const connection = await mysql.createConnection(database);
  await connection.query<RowDataPacket[]>(QUERY_USER_PUT_LOGOUT, params);
  connection.end();
};
