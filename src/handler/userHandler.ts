import { createUser, getUser } from "../model/userModel";

import { GetUserResponse } from "../types/response/getUser";
import { CreateUserRequest } from "../types/request/createUser";
import { CreateUserResponse } from "../types/response/createUser";

export const getUserHandler = async (
  userId: number
): Promise<GetUserResponse> => {
  const user = await getUser(userId);
  const response: GetUserResponse = {
    userId: user.id,
    userName: user.name,
  };
  return response;
};

export const createUserHandler = async (
  request: CreateUserRequest
): Promise<CreateUserResponse> => {
  // TODO:パスワードのハッシュ化
  const insertId = await createUser(request.userName, request.password);
  const response: CreateUserResponse = {
    userId: insertId,
  };
  return response;
};
