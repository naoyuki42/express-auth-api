import { Request, Response } from "express";

import {
  HTTP_STATUS_OK,
  HTTP_STATUS_SERVER_ERROR,
} from "../../constants/HTTPStatus";
import { HEALTH_CHECK_OK, SERVER_ERROR } from "../../constants/Message";
import { ResponseError, ResponseHealthCheck } from "../../types/response";

export const healthCheckHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response: ResponseHealthCheck = { health: HEALTH_CHECK_OK };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    // TODO:エラーハンドリングの共通化
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
