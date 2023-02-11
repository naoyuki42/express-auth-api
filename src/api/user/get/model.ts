import mysql, { RowDataPacket } from "mysql2/promise";

import database from "../../../config/database";
import { QUERY_USER_GET } from "../../../constants/Query";

export const userGetModel = async (
  userId: number
): Promise<{ userId: number; userName: string }> => {
  const params = [userId];
  const connection = await mysql.createConnection(database);
  const [rows] = await connection.query<RowDataPacket[]>(
    QUERY_USER_GET,
    params
  );
  const result = {
    userId: rows[0].id,
    userName: rows[0].name,
  };
  connection.end();
  return result;
};
