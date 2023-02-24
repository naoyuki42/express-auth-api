import { Request, Response, NextFunction } from "express";
import { createContext } from "../../../config/context";
import { AuthController } from "../../controller/AuthController";
import { HTTP_STATUS_NO_CONTENT } from "../../../constants/HTTPStatus";

/** ハンドラー：パスワード変更 */
export const changePasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController(createContext());
    await controller.changePassword(req);
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
