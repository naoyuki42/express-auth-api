import {
  ResultSetHeader,
  RowDataPacket,
  createConnection,
} from "mysql2/promise";

import database from "../../config/database";
import {
  QUERY_USER_CREATE,
  QUERY_USER_DELETE,
  QUERY_USER_GET,
} from "../../constants/Query";

export class UserModel {
  /** ユーザーの取得 */
  async get(userId: number): Promise<RowDataPacket> {
    const params = [userId];
    const connection = await createConnection(database);
    const [rows] = await connection.query<RowDataPacket[]>(
      QUERY_USER_GET,
      params
    );
    connection.end();
    return rows[0];
  }
  /** ユーザーの作成 */
  async create(userName: string, password: string): Promise<ResultSetHeader> {
    const params = [userName, password];
    const connection = await createConnection(database);
    const [result] = await connection.execute<ResultSetHeader>(
      QUERY_USER_CREATE,
      params
    );
    connection.end();
    return result;
  }
  /** ユーザーの削除 */
  async delete(userId: number): Promise<void> {
    const params = [userId];
    const connection = await createConnection(database);
    await connection.query<RowDataPacket[]>(QUERY_USER_DELETE, params);
    connection.end();
  }
}
