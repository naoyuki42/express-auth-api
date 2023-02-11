import { Request, Response } from "express";

import { userGetModel } from "./model";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_SERVER_ERROR,
} from "../../../constants/HTTPStatus";
import { SERVER_ERROR } from "../../../constants/Message";
import { ResponseError, ResponseUserGet } from "../../../types/response";

export const userGetHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name } = await userGetModel(Number(req.params.userId));
    const response: ResponseUserGet = {
      userId: id,
      userName: name,
    };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    console.error(err);
    const response: ResponseError = {
      code: HTTP_STATUS_SERVER_ERROR,
      message: SERVER_ERROR,
    };
    res.status(HTTP_STATUS_SERVER_ERROR).json(response);
  }
};
