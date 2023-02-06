import { createUser } from "../model/userModel";

import { CreateUserRequest } from "../types/request/createUser";
import { CreateUser } from "../types/query/createUser";

export const createUserHandler = async (
  request: CreateUserRequest
): Promise<void> => {
  try {
    // TODO:パスワードのハッシュ化
    const params: CreateUser = {
      userName: request.userName,
      password: request.password,
    };
    await createUser(params);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
  }
};
