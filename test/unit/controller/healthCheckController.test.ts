import { getMockReq } from "@jest-mock/express";
import { HealthCheckController } from "../../../src/api/controller/HealthCheckController";

describe("healthCheckメソッド", () => {
  test("正常系", async () => {
    // 想定結果
    const expected = { health: "OK" };
    // 前準備
    const mockRequest = getMockReq();
    // テストの実施
    const controller = new HealthCheckController();
    const received = await controller.healthCheck(mockRequest);
    // レスポンスボディが想定通りであること
    expect(received).toStrictEqual(expected);
  });
});
