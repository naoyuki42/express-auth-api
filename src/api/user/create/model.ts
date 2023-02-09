import mysql, { ResultSetHeader } from "mysql2/promise";

import database from "../../../config/database";
import { QUERY_USER_CREATE } from "../../../constants/Query";

export const userCreateModel = async (
  userName: string,
  password: string
): Promise<{ userId: number }> => {
  const params = [userName, password];
  const connection = await mysql.createConnection(database);
  const [result] = await connection.execute<ResultSetHeader>(
    QUERY_USER_CREATE,
    params
  );
  connection.end();
  // TODO:型の整理
  return { userId: result.insertId };
};
