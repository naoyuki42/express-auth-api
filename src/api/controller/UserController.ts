import { Request } from "express";
import { hash } from "bcrypt";
import { HASHED_SALT_ROUNDS } from "../../env";
import { Context } from "../../context";
import { UserModel } from "../model/UserModel";
import { parseNumber } from "../../util";
import {
  ResponseTypeUserCreate,
  ResponseTypeUserDelete,
  ResponseTypeUserGet,
} from "../../types/response";

export class UserController {
  userModel: UserModel;

  constructor(context: Context) {
    this.userModel = new UserModel(context);
  }

  /** ユーザー取得 */
  async userGet(req: Request): Promise<ResponseTypeUserGet> {
    // ユーザーの取得
    const userId = parseNumber(req.params.userId);
    const user = await this.userModel.get(userId);
    const response: ResponseTypeUserGet = {
      userId: user.id,
      userName: user.name,
    };
    return response;
  }
  /** ユーザー作成 */
  async userCreate(req: Request): Promise<ResponseTypeUserCreate> {
    // パスワードのハッシュ化
    const hashedPassword = await hash(req.body.password, HASHED_SALT_ROUNDS);
    // ユーザーの作成
    const createUser = await this.userModel.create(
      req.body.userName,
      hashedPassword
    );
    const response: ResponseTypeUserCreate = {
      userId: createUser.id,
    };
    return response;
  }
  /** ユーザー削除 */
  async userDelete(req: Request): Promise<ResponseTypeUserDelete> {
    // ユーザーの削除
    const userId = parseNumber(req.params.userId);
    await this.userModel.delete(userId);
  }
}
