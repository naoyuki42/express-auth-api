import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import {
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
} from "../../../constants/HTTPStatus";
import {
  FORBIDDEN,
  SERVER_ERROR,
  UNAUTHORIZED,
} from "../../../constants/Message";
import { ResponseError } from "../../../types/response";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // エラーログの出力
  console.error(err);
  // 認証失敗
  if (err instanceof Error && err.message === UNAUTHORIZED) {
    const response: ResponseError = {
      error: {
        code: HTTP_STATUS_UNAUTHORIZED,
        message: UNAUTHORIZED,
      },
    };
    res.status(HTTP_STATUS_UNAUTHORIZED).json(response);
  }
  // 認可されていない
  if (err instanceof (JsonWebTokenError || TokenExpiredError)) {
    const response: ResponseError = {
      error: {
        code: HTTP_STATUS_FORBIDDEN,
        message: FORBIDDEN,
      },
    };
    res.status(HTTP_STATUS_FORBIDDEN).json(response);
  }
  // サーバーエラー
  const response: ResponseError = {
    error: {
      code: HTTP_STATUS_SERVER_ERROR,
      message: SERVER_ERROR,
    },
  };
  res.status(HTTP_STATUS_SERVER_ERROR).json(response);
};
