import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controller/AuthController";
import { Login, Logout, ResponseType } from "../../types/response";

/** ハンドラー：ログイン */
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController();
    const response: ResponseType<Login> = await controller.login(req);
    res.status(response.status).json(response?.body);
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
    const response: ResponseType<Logout> = await controller.logout(req);
    res.status(response.status).json(response?.body);
  } catch (err: unknown) {
    next(err);
  }
};
