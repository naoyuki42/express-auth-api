import { getMockReq } from "@jest-mock/express";
import { HealthCheckController } from "../../../src/api/controller/HealthCheckController";

describe("healthCheckメソッド", () => {
  let controller: HealthCheckController;

  beforeEach(() => {
    controller = new HealthCheckController();
  });
  test("正常系", async () => {
    // 前準備
    const mockRequest = getMockReq();
    // 想定結果
    const expected = { health: "OK" };
    // テストの実施
    const received = await controller.healthCheck(mockRequest);
    // レスポンスボディが想定通りであること
    expect(received).toStrictEqual(expected);
  });
});
