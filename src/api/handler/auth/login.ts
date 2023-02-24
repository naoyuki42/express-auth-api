import { Request, Response, NextFunction } from "express";
import { createContext } from "../../../config/context";
import { AuthController } from "../../controller/AuthController";
import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";
import { ResponseTypeLogin } from "../../../types/response";

/** ハンドラー：ログイン */
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController(createContext());
    const response: ResponseTypeLogin = await controller.login(req);
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
