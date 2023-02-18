import { Request } from "express";
import { hash } from "bcrypt";
import { createContext } from "../../context";
import { UserModel } from "../model/UserModel";
import {
  ResponseTypeUserCreate,
  ResponseTypeUserDelete,
  ResponseTypeUserGet,
} from "../../types/response";

export class UserController {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(createContext().prisma);
  }

  /** ユーザー取得 */
  async userGet(req: Request): Promise<ResponseTypeUserGet> {
    // ユーザーの取得
    const user = await this.userModel.get(Number(req.params.userId));
    if (user === null) throw new Error();

    const response: ResponseTypeUserGet = {
      userId: user.id,
      userName: user.name,
    };
    return response;
  }

  /** ユーザー作成 */
  async userCreate(req: Request): Promise<ResponseTypeUserCreate> {
    // パスワードのハッシュ化
    const hashedPassword = await hash(req.body.password, 10);

    // ユーザーの作成
    const createUser = await this.userModel.create(
      req.body.userName,
      hashedPassword
    );
    if (createUser === null) throw new Error();

    const response: ResponseTypeUserCreate = {
      userId: createUser.id,
    };
    return response;
  }
  /** ユーザー削除 */
  async userDelete(req: Request): Promise<ResponseTypeUserDelete> {
    // ユーザーの削除
    const deleteUser = await this.userModel.delete(Number(req.params.userId));
    if (deleteUser === null) throw new Error();
  }
}
