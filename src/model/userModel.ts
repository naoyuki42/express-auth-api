import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import database from "../config/database";

import Query from "../constants/query";

import { GetUser, GetUserParams } from "../types/query/getUser";
import { CreateUserParams } from "../types/query/createUser";

export const getUser = async (userId: number): Promise<GetUser> => {
  const queryParams: GetUserParams = [userId];
  const connection = await mysql.createConnection(database);
  const [rows] = await connection.query<RowDataPacket[]>(
    Query.User.GetOne,
    queryParams
  );
  const result: GetUser = {
    id: rows[0].id,
    name: rows[0].name,
  };
  connection.end();
  return result;
};

export const createUser = async (
  userName: string,
  password: string
): Promise<number> => {
  const queryParams: CreateUserParams = [userName, password];
  const connection = await mysql.createConnection(database);
  const [result] = await connection.execute<ResultSetHeader>(
    Query.User.Create,
    queryParams
  );
  connection.end();
  return result.insertId;
};
