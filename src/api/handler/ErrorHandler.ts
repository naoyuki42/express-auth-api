/** ライブラリ */
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
/** 定数 */
import {
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_NOT_FOUND,
} from "../../constants/HTTPStatus";
import {
  UNAUTHORIZED,
  FORBIDDEN,
  SERVER_ERROR,
  NOT_FOUND,
} from "../../constants/Message";
/** 型 */
import { ResponseError } from "../../types/response";

export class ErrorHandlerClass {
  /** エラー */
  errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    // エラーログの出力
    console.error(err);
    if (err.message === UNAUTHORIZED) {
      // 認証失敗
      const response: ResponseError = {
        error: {
          code: HTTP_STATUS_UNAUTHORIZED,
          message: UNAUTHORIZED,
        },
      };
      res.status(HTTP_STATUS_UNAUTHORIZED).json(response);
    } else if (err instanceof (JsonWebTokenError || TokenExpiredError)) {
      // 認可されていない
      const response: ResponseError = {
        error: {
          code: HTTP_STATUS_FORBIDDEN,
          message: FORBIDDEN,
        },
      };
      res.status(HTTP_STATUS_FORBIDDEN).json(response);
    } else {
      // サーバーエラー
      const response: ResponseError = {
        error: {
          code: HTTP_STATUS_SERVER_ERROR,
          message: SERVER_ERROR,
        },
      };
      res.status(HTTP_STATUS_SERVER_ERROR).json(response);
    }
  }
  /** NotFound */
  notFoundHandler = (_req: Request, res: Response): void => {
    const response: ResponseError = {
      error: {
        code: HTTP_STATUS_NOT_FOUND,
        message: NOT_FOUND,
      },
    };
    res.status(HTTP_STATUS_NOT_FOUND).json(response);
  };
}
