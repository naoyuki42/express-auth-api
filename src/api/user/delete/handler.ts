import { NextFunction, Request, Response } from "express";

import { userDeleteModel } from "./model";
import { HTTP_STATUS_NO_CONTENT } from "../../../constants/HTTPStatus";

export const userDeleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userDeleteModel(Number(req.params.userId));
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
  }
};
