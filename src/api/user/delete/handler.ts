import { Request, Response } from "express";

import { userDeleteModel } from "./model";
import {
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_SERVER_ERROR,
} from "../../../constants/HTTPStatus";
import { SERVER_ERROR } from "../../../constants/Message";
import { ResponseError } from "../../../types/response";

export const userDeleteHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await userDeleteModel(Number(req.params.userId));
    res.status(HTTP_STATUS_NO_CONTENT).json();
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
