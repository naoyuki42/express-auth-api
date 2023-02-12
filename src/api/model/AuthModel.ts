import { RowDataPacket, createConnection } from "mysql2/promise";

import database from "../../config/database";
import {
  QUERY_USER_GET_LOGIN,
  QUERY_USER_GET_TOKEN,
  QUERY_USER_PUT_LOGIN,
  QUERY_USER_PUT_LOGOUT,
} from "../../constants/Query";

export class AuthModelClass {
  /** 認証用ユーザー情報の取得 */
  async getAuthUser(userName: string): Promise<RowDataPacket> {
    const params = [userName];
    const connection = await createConnection(database);
    const [rows] = await connection.query<RowDataPacket[]>(
      QUERY_USER_GET_LOGIN,
      params
    );
    connection.end();
    return rows[0];
  }
  /** トークンの保存 */
  async setToken(userId: number, token: string): Promise<void> {
    const params = [token, userId];
    const connection = await createConnection(database);
    await connection.query<RowDataPacket[]>(QUERY_USER_PUT_LOGIN, params);
    connection.end();
  }
  /** トークンの取得 */
  async getToken(userName: string): Promise<RowDataPacket> {
    const params = [userName];
    const connection = await createConnection(database);
    const [rows] = await connection.query<RowDataPacket[]>(
      QUERY_USER_GET_TOKEN,
      params
    );
    connection.end();
    return rows[0];
  }
  /** ログアウト（トークンの削除） */
  async logout(userName: string): Promise<void> {
    const params = [userName];
    const connection = await createConnection(database);
    await connection.query<RowDataPacket[]>(QUERY_USER_PUT_LOGOUT, params);
    connection.end();
  }
}
