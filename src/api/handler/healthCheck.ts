import { Request, Response, NextFunction } from "express";
import { HealthCheckController } from "../controller/HealthCheckController";

/** ハンドラー：ヘルスチェック */
export const healthCheckHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const controller = new HealthCheckController();
    const response = await controller.healthCheck(req);
    res.status(response.status).json(response?.body);
  } catch (err: unknown) {
    next(err);
  }
};
