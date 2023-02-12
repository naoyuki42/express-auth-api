import { createConnection, RowDataPacket } from "mysql2/promise";

import database from "../../config/database";
import { QUERY_USER_GET_TOKEN } from "../../constants/Query";

export const getTokenModel = async (
  userName: string
): Promise<RowDataPacket> => {
  const params = [userName];
  const connection = await createConnection(database);
  const [rows] = await connection.query<RowDataPacket[]>(
    QUERY_USER_GET_TOKEN,
    params
  );
  connection.end();
  return rows[0];
};
