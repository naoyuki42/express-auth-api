import { Request, Response, NextFunction } from "express";
import { HealthCheckController } from "../controller/HealthCheckController";
import { HTTP_STATUS_OK } from "../../constants/HTTPStatus";

/** ハンドラー：ヘルスチェック */
export const healthCheckHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new HealthCheckController();
    const response = await controller.healthCheck(req);
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
