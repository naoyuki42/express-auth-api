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
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
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
  }
  /** NotFound */
  notFoundHandler = (req: Request, res: Response): void => {
    const response: ResponseError = {
      error: {
        code: HTTP_STATUS_NOT_FOUND,
        message: NOT_FOUND,
      },
    };
    res.status(HTTP_STATUS_NOT_FOUND).json(response);
  };
}
