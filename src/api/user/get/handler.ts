import { NextFunction, Request, Response } from "express";

import { userGetModel } from "./model";
import { HTTP_STATUS_OK } from "../../../constants/HTTPStatus";
import { ResponseUserGet } from "../../../types/response";

export const userGetHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, name } = await userGetModel(Number(req.params.userId));
    const response: ResponseUserGet = {
      userId: id,
      userName: name,
    };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
