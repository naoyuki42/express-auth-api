import supertest from "supertest";

import app from "../../src/app";
import { URI_HEALTH_CHECK, URI_PREFIX_API } from "../../src/constants/URI";

describe("HTTPテスト:ヘルスチェックAPI", () => {
  test("正常系", async () => {
    // 想定結果
    const expectedStatus = 200;
    const expectedBody = { health: "OK" };
    // リクエストの実施
    const request = supertest(app);
    const response = await request.get(`${URI_PREFIX_API}${URI_HEALTH_CHECK}`);
    // HTTPステータスが200であること
    expect(response.status).toBe(expectedStatus);
    // レスポンスボディが想定通りであること
    expect(response.body).toStrictEqual(expectedBody);
  });
});
