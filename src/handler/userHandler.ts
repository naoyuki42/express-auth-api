import { createUser } from "../model/userModel";

import { CreateUserRequest } from "../types/request/createUser";
import { CreateUser } from "../types/query/createUser";

export const createUserHandler = (request: CreateUserRequest): void => {
  try {
    // TODO:パスワードのハッシュ化
    const params: CreateUser = {
      userName: request.userName,
      password: request.password,
    };
    createUser(params);
  } catch (err) {
    throw err;
  }
};
