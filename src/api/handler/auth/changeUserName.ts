import { Request, Response, NextFunction } from "express";
import { createContext } from "../../../config/context";
import { AuthController } from "../../controller/AuthController";
import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";
import { ResponseTypeChangeUserName } from "../../../types/response";

/** ハンドラー：ユーザー名変更 */
export const changeUserNameHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController(createContext());
    const response: ResponseTypeChangeUserName =
      await controller.changeUserName(req);
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
