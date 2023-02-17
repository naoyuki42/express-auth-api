import { Request } from "express";

import { HTTP_STATUS_OK } from "../../constants/HTTPStatus";
import { HEALTH_CHECK_OK } from "../../constants/Message";

import { ResponseType, HealthCheck } from "../../types/response";

export class HealthCheckController {
  /** ヘルスチェック */
  async healthCheck(_req: Request): Promise<ResponseType<HealthCheck>> {
    const response: ResponseType<HealthCheck> = {
      status: HTTP_STATUS_OK,
      body: {
        health: HEALTH_CHECK_OK,
      },
    };
    return response;
  }
}
