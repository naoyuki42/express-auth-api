import { Request, Response, NextFunction } from "express";

import { AuthController } from "../controller/AuthController";

/** ミドルウェア：認証 */
export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authController = new AuthController();
    await authController.authenticate(req);
    next();
  } catch (err) {
    next(err);
  }
};
