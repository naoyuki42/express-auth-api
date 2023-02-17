import { Request, Response, NextFunction } from "express";
import { UserController } from "../controller/UserController";
import {
  ResponseType,
  UserCreate,
  UserDelete,
  UserGet,
} from "../../types/response";

/** ハンドラー：ユーザー取得 */
export const userGetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new UserController();
    const response: ResponseType<UserGet> = await controller.userGet(req);
    res.status(response.status).json(response?.body);
  } catch (err: unknown) {
    next(err);
  }
};

/** ハンドラー：ユーザー作成 */
export const userCreateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new UserController();
    const response: ResponseType<UserCreate> = await controller.userCreate(req);
    res.status(response.status).json(response?.body);
  } catch (err: unknown) {
    next(err);
  }
};

/** ハンドラー：ユーザー削除 */
export const userDeleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new UserController();
    const response: ResponseType<UserDelete> = await controller.userDelete(req);
    res.status(response.status).json(response?.body);
  } catch (err: unknown) {
    next(err);
  }
};
