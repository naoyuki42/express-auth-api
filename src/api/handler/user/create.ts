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
    const hashPassword = await hash(req.body.password, 10);
    const { insertId } = await User.create(req.body.userName, hashPassword);
    const response: ResponseUserCreate = { userId: insertId };
    res.status(HTTP_STATUS_CREATED).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
