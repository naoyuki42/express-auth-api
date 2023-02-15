import { Request, Response, NextFunction } from "express";

import { ErrorService } from "../../service/ErrorService";

import { ResponseError } from "../../../types/response";

/** ハンドラー：エラー */
export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const Error = new ErrorService();
  // エラーの種類の取得
  const { code, message } = await Error.getErrorType(err);
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
};
