import { healthCheckHandler } from "../../src/api/handler/healthCheck";

describe("ヘルスチェックハンドラーのテスト", () => {
  test("正常系", async () => {
    // ハンドラーの引数
    const req: any = {};
    const res: any = {
      json: jest.fn(),
    };
    const next = jest.fn();
    // ハンドラーの実行
    await healthCheckHandler(req, res, next);
    // 結果の比較
  });
});
