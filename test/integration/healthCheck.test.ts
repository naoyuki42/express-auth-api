import supertest from "supertest";

import app from "../../src/app";
import { HTTP_STATUS_OK } from "../../src/constants/HTTPStatus";
import { HEALTH_CHECK_OK } from "../../src/constants/Message";
import { URI_HEALTH_CHECK, URI_PREFIX_API } from "../../src/constants/URI";

describe("HTTPテスト:ヘルスチェックAPI", () => {
  test("正常系①", async () => {
    // リクエストの実施とレスポンスの取得
    const request = supertest(app);
    const response = await request.get(`${URI_PREFIX_API}${URI_HEALTH_CHECK}`);
    // HTTPステータスが200であること
    expect(response.status).toBe(HTTP_STATUS_OK);
    // レスポンスボディが想定通りであること
    expect(response.body).toMatchObject({ health: HEALTH_CHECK_OK });
  });
});
