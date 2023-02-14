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

export class ErrorController {
  /** エラー */
  async errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    // エラーの種類の取得
    const { code, message } = await this.getErrorType(err);
    // エラーログの出力
    console.error(err);
    // エラーのレスポンス
    const response: ResponseError = {
      error: {
        code: code,
        message: message,
      },
    };
    res.status(code).json(response);
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
  /** エラーの種類の判定 */
  // TODO:サービスクラスに切り出し
  private async getErrorType(
    err: Error
  ): Promise<{ code: number; message: string }> {
    if (err.message === UNAUTHORIZED) {
      // 認証失敗
      return {
        code: HTTP_STATUS_UNAUTHORIZED,
        message: UNAUTHORIZED,
      };
    } else if (err instanceof (JsonWebTokenError || TokenExpiredError)) {
      // 認可されていない
      return {
        code: HTTP_STATUS_FORBIDDEN,
        message: FORBIDDEN,
      };
    } else {
      // サーバーエラー
      return {
        code: HTTP_STATUS_SERVER_ERROR,
        message: SERVER_ERROR,
      };
    }
  }
}
