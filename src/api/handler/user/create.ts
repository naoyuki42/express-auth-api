import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";

import { UserModel } from "../../model/UserModel";

import { HTTP_STATUS_CREATED } from "../../../constants/HTTPStatus";

import { ResponseUserCreate } from "../../../types/response";

/** ハンドラー：ユーザー作成 */
export const userCreateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const User = new UserModel();
  try {
    // パスワードのハッシュ化
    const hashedPassword = await hash(req.body.password, 10);

    // ユーザーの作成
    const createUser = await User.create(req.body.userName, hashedPassword);
    // ユーザーが作成出来なかった場合エラー
    if (createUser === null) throw new Error();

    // レスポンス
    const response: ResponseUserCreate = { userId: createUser.id };
    res.status(HTTP_STATUS_CREATED).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
