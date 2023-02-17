import { Request } from "express";
import { hash } from "bcrypt";
import { UserModel } from "../model/UserModel";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../../constants/HTTPStatus";
import {
  ResponseType,
  UserCreate,
  UserDelete,
  UserGet,
} from "../../types/response";

export class UserController {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  /** ユーザー取得 */
  async userGet(req: Request): Promise<ResponseType<UserGet>> {
    // ユーザーの取得
    const user = await this.userModel.get(Number(req.params.userId));
    if (user === null) throw new Error();

    const response: ResponseType<UserGet> = {
      status: HTTP_STATUS_OK,
      body: {
        userId: user.id,
        userName: user.name,
      },
    };
    return response;
  }

  /** ユーザー作成 */
  async userCreate(req: Request): Promise<ResponseType<UserCreate>> {
    // パスワードのハッシュ化
    const hashedPassword = await hash(req.body.password, 10);

    // ユーザーの作成
    const createUser = await this.userModel.create(
      req.body.userName,
      hashedPassword
    );
    if (createUser === null) throw new Error();

    const response: ResponseType<UserCreate> = {
      status: HTTP_STATUS_CREATED,
      body: {
        userId: createUser.id,
      },
    };
    return response;
  }
  /** ユーザー削除 */
  async userDelete(req: Request): Promise<ResponseType<UserDelete>> {
    // ユーザーの削除
    const deleteUser = await this.userModel.delete(Number(req.params.userId));
    if (deleteUser === null) throw new Error();

    const response: ResponseType<UserDelete> = {
      status: HTTP_STATUS_NO_CONTENT,
    };
    return response;
  }
}
