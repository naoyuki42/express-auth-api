import { Request, Response, NextFunction } from "express";
import { createContext } from "../../../config/context";
import { AuthController } from "../../controller/AuthController";
import { HTTP_STATUS_NO_CONTENT } from "../../../constants/HTTPStatus";

/** ハンドラー：退会 */
export const userDeleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new AuthController(createContext());
    await controller.userDelete(req);
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
