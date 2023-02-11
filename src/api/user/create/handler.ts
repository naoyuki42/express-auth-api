import { Request, Response } from "express";

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
    const response: ResponseUserCreate = await userCreateModel(
      req.body.userName,
      req.body.password
    );
    res.status(HTTP_STATUS_CREATED).json(response);
  } catch (err: unknown) {
    console.error(err);
    const response: ResponseError = {
      code: HTTP_STATUS_SERVER_ERROR,
      message: SERVER_ERROR,
    };
    res.status(HTTP_STATUS_SERVER_ERROR).json(response);
  }
};
