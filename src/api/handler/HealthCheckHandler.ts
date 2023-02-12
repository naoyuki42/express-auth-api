import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_OK } from "../../constants/HTTPStatus";
import { HEALTH_CHECK_OK } from "../../constants/Message";
import { ResponseHealthCheck } from "../../types/response";

export class HealthCheckHandlerClass {
  /** ヘルスチェック */
  healthCheckHandler(_req: Request, res: Response, next: NextFunction): void {
    try {
      const response: ResponseHealthCheck = { health: HEALTH_CHECK_OK };
      res.status(HTTP_STATUS_OK).json(response);
    } catch (err: unknown) {
      next(err);
    }
  }
}
