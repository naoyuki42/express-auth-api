/** ライブラリ */
import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
/** クラス */
import { UserModelClass } from "../model/UserModel";
/** 定数 */
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../../constants/HTTPStatus";
/** 型 */
import { ResponseUserCreate, ResponseUserGet } from "../../types/response";

export class UserHandlerClass {
  /** ユーザー取得 */
  async getHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const User = new UserModelClass();
    try {
      const { id, name } = await User.get(Number(req.params.userId));
      const response: ResponseUserGet = {
        userId: id,
        userName: name,
      };
      res.status(HTTP_STATUS_OK).json(response);
    } catch (err: unknown) {
      next(err);
    }
  }
  /** ユーザー作成 */
  async createHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const User = new UserModelClass();
    try {
      const hashPassword = await hash(req.body.password, 10);
      const { insertId } = await User.create(req.body.userName, hashPassword);
      const response: ResponseUserCreate = { userId: insertId };
      res.status(HTTP_STATUS_CREATED).json(response);
    } catch (err: unknown) {
      next(err);
    }
  }
  /** ユーザー削除 */
  async deleteHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const User = new UserModelClass();
    try {
      await User.delete(Number(req.params.userId));
      res.status(HTTP_STATUS_NO_CONTENT).json();
    } catch (err: unknown) {
      next(err);
    }
  }
}
