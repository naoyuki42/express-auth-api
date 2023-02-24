import { Request, Response, NextFunction } from "express";
import { createContext } from "../../../config/context";
import { AuthController } from "../../controller/AuthController";
import { HTTP_STATUS_CREATED } from "../../../constants/HTTPStatus";

/** ハンドラー：会員登録 */
export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController(createContext());
    await controller.register(req);
    res.status(HTTP_STATUS_CREATED).json();
  } catch (err: unknown) {
    next(err);
  }
};
