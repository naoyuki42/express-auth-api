import { Request, Response, NextFunction } from "express";
import { ErrorService } from "../../service/ErrorService";
import { ResponseTypeError } from "../../../types/response";

/** ハンドラー：エラー */
export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  // エラーログの出力
  console.error(err);
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
};
