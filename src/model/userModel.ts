import database from "../config/database";

import Query from "../constants/query";

import { CreateUser, CreateUserParams } from "../types/query/createUser";

export const createUser = (params: CreateUser): void => {
  try {
    const queryParams: CreateUserParams = [params.userName, params.password];
    database.query(Query.User.Create, queryParams, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    throw err;
  }
};
