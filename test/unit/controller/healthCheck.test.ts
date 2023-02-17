import { Request } from "express";
import { getMockReq } from "@jest-mock/express";
import { HealthCheckController } from "../../../src/api/controller/HealthCheckController";
import { HTTP_STATUS_OK } from "../../../src/constants/HTTPStatus";
import { HEALTH_CHECK_OK } from "../../../src/constants/Message";

describe("コントローラー：ヘルスチェック", () => {
  test("正常系①", async () => {
    const mockRequest: Request = getMockReq();
    const controller = new HealthCheckController();
    const response = await controller.healthCheck(mockRequest);
    // HTTPステータスが200であること
    expect(response.status).toBe(HTTP_STATUS_OK);
    // レスポンスボディが想定通りであること
    expect(response.body).toMatchObject({ health: HEALTH_CHECK_OK });
  });
});
