import mysql, { RowDataPacket } from "mysql2/promise";

import database from "../../../config/database";
import {
  QUERY_USER_GET_LOGIN,
  QUERY_USER_PUT_LOGIN,
} from "../../../constants/Query";

export const userGetAuthModel = async (
  userName: string
): Promise<RowDataPacket> => {
  const params = [userName];
  const connection = await mysql.createConnection(database);
  const [rows] = await connection.query<RowDataPacket[]>(
    QUERY_USER_GET_LOGIN,
    params
  );
  connection.end();
  return rows[0];
};

export const setTokenModel = async (
  userId: number,
  token: string
): Promise<void> => {
  const params = [token, userId];
  const connection = await mysql.createConnection(database);
  await connection.query<RowDataPacket[]>(QUERY_USER_PUT_LOGIN, params);
  connection.end();
};
