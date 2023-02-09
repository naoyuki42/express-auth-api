import { Request, Response } from "express";

import { userCreateModel } from "./model";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_SERVER_ERROR,
} from "../../../constants/HTTPStatus";
import { ErrorResponse } from "../../../types/response/error";

export const userCreateHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await userCreateModel(
      req.body.userName,
      req.body.password
    );
    res.status(HTTP_STATUS_CREATED).json(response);
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
