import { getMockReq } from "@jest-mock/express";
import { HealthCheckController } from "../../../src/api/controller/HealthCheckController";
import { HEALTH_CHECK_OK } from "../../../src/constants/Message";

describe("コントローラー：ヘルスチェック", () => {
  test("正常系①", async () => {
    const mockRequest = getMockReq();
    const controller = new HealthCheckController();
    const response = await controller.healthCheck(mockRequest);
    // レスポンスボディが想定通りであること
    expect(response).toMatchObject({ health: HEALTH_CHECK_OK });
  });
});
