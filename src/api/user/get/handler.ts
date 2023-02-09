import { Request, Response } from "express";

import { userGetModel } from "./model";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_SERVER_ERROR,
} from "../../../constants/HTTPStatus";
import { ErrorResponse } from "../../../types/response/error";

export const userGetHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await userGetModel(Number(req.params.userId));
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    // TODO:エラーハンドリングの共通化
    if (err instanceof Error) {
      const response: ErrorResponse = {
        code: HTTP_STATUS_SERVER_ERROR,
        message: err.message,
      };
      res.status(HTTP_STATUS_SERVER_ERROR).json(response);
    }
  }
};
