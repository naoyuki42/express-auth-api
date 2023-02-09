import mysql, { RowDataPacket } from "mysql2/promise";

import database from "../../../config/database";
import { QUERY_USER_GET } from "../../../constants/Query";
import { GetUser } from "../../../types/query/getUser";

export const userGetModel = async (userId: number): Promise<GetUser> => {
  const params = [userId];
  const connection = await mysql.createConnection(database);
  const [rows] = await connection.query<RowDataPacket[]>(
    QUERY_USER_GET,
    params
  );
  const result: GetUser = {
    id: rows[0].id,
    name: rows[0].name,
  };
  connection.end();
  return result;
};
