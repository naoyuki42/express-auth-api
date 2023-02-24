import { Request, Response } from "express";
import { ResponseTypeError } from "../../../types/response";
import { HTTP_STATUS_NOT_FOUND } from "../../../constants/HTTPStatus";
import { NOT_FOUND } from "../../../constants/Message";

/** ハンドラー：NotFound */
export const notFoundHandler = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const response: ResponseTypeError = {
    error: {
      code: HTTP_STATUS_NOT_FOUND,
      message: NOT_FOUND,
    },
  };
  res.status(HTTP_STATUS_NOT_FOUND).json(response);
};
