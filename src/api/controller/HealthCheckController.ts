import { Request } from "express";

import { HTTP_STATUS_OK } from "../../constants/HTTPStatus";
import { HEALTH_CHECK_OK } from "../../constants/Message";

import { ResponseTypeHealthCheck } from "../../types/response";

export class HealthCheckController {
  /** ヘルスチェック */
  async healthCheck(_req: Request): Promise<ResponseTypeHealthCheck> {
    // レスポンスボディ
    const response: ResponseTypeHealthCheck = {
      health: HEALTH_CHECK_OK,
    };
    return response;
  }
}
