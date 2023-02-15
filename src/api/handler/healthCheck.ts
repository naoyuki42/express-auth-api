import { Request, Response, NextFunction } from "express";

import { HTTP_STATUS_OK } from "../../constants/HTTPStatus";
import { HEALTH_CHECK_OK } from "../../constants/Message";

import { ResponseHealthCheck } from "../../types/response";

/** ハンドラー：ヘルスチェック */
export const healthCheckHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // レスポンス
    const response: ResponseHealthCheck = { health: HEALTH_CHECK_OK };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
