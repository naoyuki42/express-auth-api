import { Request, Response, NextFunction } from "express";
import { ErrorService } from "../service/ErrorService";
import { ResponseTypeError } from "../../types/response";
import {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_SERVER_ERROR,
} from "../../constants/HTTPStatus";
import { NOT_FOUND, SERVER_ERROR } from "../../constants/Message";

/** ハンドラー：エラー */
export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    // エラーの種類の取得
    const errorService = new ErrorService();
    const { code, message } = await errorService.getErrorType(err);

    const response: ResponseTypeError = {
      error: {
        code: code,
        message: message,
      },
    };
    res.status(code).json(response);
  } catch (err: unknown) {
    const response: ResponseTypeError = {
      error: {
        code: HTTP_STATUS_SERVER_ERROR,
        message: SERVER_ERROR,
      },
    };
    res.status(HTTP_STATUS_SERVER_ERROR).json(response);
  } finally {
    // エラーログの出力
    console.error(err);
  }
};

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
