import { Request, Response, NextFunction } from "express";
import { createContext } from "../../context";
import { UserController } from "../controller/UserController";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NO_CONTENT,
} from "../../constants/HTTPStatus";
import {
  ResponseTypeUserCreate,
  ResponseTypeUserGet,
} from "../../types/response";

/** ハンドラー：ユーザー取得 */
export const userGetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new UserController(createContext());
    const response: ResponseTypeUserGet = await controller.userGet(req);
    res.status(HTTP_STATUS_OK).json(response);
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
    const controller = new UserController(createContext());
    const response: ResponseTypeUserCreate = await controller.userCreate(req);
    res.status(HTTP_STATUS_CREATED).json(response);
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
    const controller = new UserController(createContext());
    await controller.userDelete(req);
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
