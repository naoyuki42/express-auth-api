import { Request } from "express";
import { Context } from "../../config/context";
import { UserModel } from "../model/UserModel";
import { ResponseTypeUserGet } from "../../types/response";

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
}
