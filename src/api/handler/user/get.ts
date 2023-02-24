import { Request, Response, NextFunction } from "express";
import { createContext } from "../../../config/context";
import { UserController } from "../../controller/UserController";
import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";
import { ResponseTypeUserGet } from "../../../types/response";

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
