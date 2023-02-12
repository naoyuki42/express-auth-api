import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";

import { userCreateModel } from "./model";
import { HTTP_STATUS_CREATED } from "../../../constants/HTTPStatus";
import { ResponseUserCreate } from "../../../types/response";

export const userCreateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hashPassword = await hash(req.body.password, 10);
    const { insertId } = await userCreateModel(req.body.userName, hashPassword);
    const response: ResponseUserCreate = {
      userId: insertId,
    };
    res.status(HTTP_STATUS_CREATED).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
