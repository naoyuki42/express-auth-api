import { Request, Response, NextFunction } from "express";

import { UserModel } from "../../model/UserModel";

import { HTTP_STATUS_NO_CONTENT } from "../../../constants/HTTPStatus";

/** ハンドラー：ユーザー削除 */
export const userDeleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const User = new UserModel();
  try {
    await User.delete(Number(req.params.userId));
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
