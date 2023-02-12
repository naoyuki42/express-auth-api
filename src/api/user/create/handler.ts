import { Request, Response } from "express";
import { hash } from "bcrypt";

import { userCreateModel } from "./model";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_SERVER_ERROR,
} from "../../../constants/HTTPStatus";
import { SERVER_ERROR } from "../../../constants/Message";
import { ResponseUserCreate, ResponseError } from "../../../types/response";

export const userCreateHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hashPassword = await hash(req.body.password, 10);
    const { insertId } = await userCreateModel(req.body.userName, hashPassword);
    const response: ResponseUserCreate = {
      userId: insertId,
    };
    res.status(HTTP_STATUS_CREATED).json(response);
  } catch (err: unknown) {
    console.error(err);
    const response: ResponseError = {
      error: {
        code: HTTP_STATUS_SERVER_ERROR,
        message: SERVER_ERROR,
      },
    };
    res.status(HTTP_STATUS_SERVER_ERROR).json(response);
  }
};
