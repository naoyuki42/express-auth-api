import { Request } from "express";
import { hash } from "bcrypt";
import { HASHED_SALT_ROUNDS } from "../../env";
import { Context } from "../../context";
import { UserModel } from "../model/UserModel";
import {
  ResponseTypeUserCreate,
  ResponseTypeUserDelete,
  ResponseTypeUserGet,
} from "../../types/response";

export class UserController {
  private userModel: UserModel;

  constructor(context: Context) {
    this.userModel = new UserModel(context);
  }

  /** ユーザー取得 */
  async userGet(req: Request): Promise<ResponseTypeUserGet> {
    // パスパラメータの数値への変換
    const userId = Number(req.params.userId);
    // ユーザーの取得
    const { id, name } = await this.userModel.get(userId);
    // レスポンスボディ
    const response: ResponseTypeUserGet = {
      userId: id,
      userName: name,
    };
    return response;
  }
  /** ユーザー作成 */
  async userCreate(req: Request): Promise<ResponseTypeUserCreate> {
    // パスワードのハッシュ化
    const hashedPassword = await hash(req.body.password, HASHED_SALT_ROUNDS);
    // ユーザーの作成
    const { id } = await this.userModel.create(
      req.body.userName,
      hashedPassword
    );
    // レスポンスボディ
    const response: ResponseTypeUserCreate = {
      userId: id,
    };
    return response;
  }
  /** ユーザー削除 */
  async userDelete(req: Request): Promise<ResponseTypeUserDelete> {
    // パスパラメータの数値への変換
    const userId = Number(req.params.userId);
    // ユーザーの削除
    await this.userModel.delete(userId);
  }
}
