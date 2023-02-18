import supertest from "supertest";
import app from "../../src/app";

describe("HTTPテスト:404 Not Found", () => {
  test("異常系:存在しないURLにアクセスした場合", async () => {
    // 想定結果
    const expectedStatus = 404;
    const expectedBody = {
      error: {
        code: 404,
        message: "not found",
      },
    };
    // リクエストの実施
    const request = supertest(app);
    const response = await request.get(`/naoyuki42`);
    // HTTPステータスが404であること
    expect(response.status).toBe(expectedStatus);
    // レスポンスボディが想定通りであること
    expect(response.body).toStrictEqual(expectedBody);
  });
});
