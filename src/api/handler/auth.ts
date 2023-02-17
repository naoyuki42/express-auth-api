import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controller/AuthController";
import {
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../../constants/HTTPStatus";
import { ResponseTypeLogin } from "../../types/response";

/** ハンドラー：ログイン */
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController();
    const response: ResponseTypeLogin = await controller.login(req);
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};

/** ハンドラー：ログアウト */
export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController();
    await controller.logout(req);
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
