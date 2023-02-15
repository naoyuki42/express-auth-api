import { Request, Response } from "express";

import { HTTP_STATUS_NOT_FOUND } from "../../../constants/HTTPStatus";
import { NOT_FOUND } from "../../../constants/Message";

import { ResponseError } from "../../../types/response";

/** ハンドラー：NotFound */
export const notFoundHandler = (_req: Request, res: Response): void => {
  const response: ResponseError = {
    error: {
      code: HTTP_STATUS_NOT_FOUND,
      message: NOT_FOUND,
    },
  };
  res.status(HTTP_STATUS_NOT_FOUND).json(response);
};
