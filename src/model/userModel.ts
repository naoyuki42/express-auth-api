import mysql from "mysql2/promise";

import database from "../config/database";
import Query from "../constants/query";

import { CreateUser, CreateUserParams } from "../types/query/createUser";

export const createUser = async (params: CreateUser): Promise<void> => {
  try {
    const queryParams: CreateUserParams = [params.userName, params.password];
    const connection = await mysql.createConnection(database);
    await connection.query(Query.User.Create, queryParams);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
  } finally {
    (connection: mysql.Connection) => connection.end();
  }
};
