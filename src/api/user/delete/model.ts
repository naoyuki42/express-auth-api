import { RowDataPacket, createConnection } from "mysql2/promise";

import database from "../../../config/database";
import { QUERY_USER_DELETE } from "../../../constants/Query";

export const userDeleteModel = async (userId: number): Promise<void> => {
  const params = [userId];
  const connection = await createConnection(database);
  await connection.query<RowDataPacket[]>(QUERY_USER_DELETE, params);
  connection.end();
};
