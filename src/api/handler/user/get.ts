import { Request, Response, NextFunction } from "express";

import { UserModel } from "../../model/UserModel";

import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";

import { ResponseUserGet } from "../../../types/response";

/** ハンドラー：ユーザー取得 */
export const userGetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const User = new UserModel();
  try {
    // ユーザーの取得
    const user = await User.get(Number(req.params.userId));
    // ユーザーを取得出来なかった場合エラー
    if (user === null) throw new Error();

    // レスポンス
    const response: ResponseUserGet = {
      userId: user.id,
      userName: user.name,
    };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
