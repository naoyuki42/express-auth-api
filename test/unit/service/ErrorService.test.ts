import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ErrorService } from "../../../src/api/service/ErrorService";
import { FORBIDDEN, UNAUTHORIZED } from "../../../src/constants/Message";

describe("getErrorTypeメソッド", () => {
  let errorService: ErrorService;

  beforeEach(() => {
    errorService = new ErrorService();
  });

  test("正常系：認証失敗", async () => {
    // 前準備
    const argument = new Error(UNAUTHORIZED);
    // 想定結果
    const expected = {
      code: 401,
      message: "unauthorized",
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(errorService.getErrorType(argument)).resolves.toStrictEqual(
      expected
    );
  });

  test("正常系：認可されていない①", async () => {
    // 前準備
    const argument = new JsonWebTokenError(FORBIDDEN);
    // 想定結果
    const expected = {
      code: 403,
      message: "forbidden",
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(errorService.getErrorType(argument)).resolves.toStrictEqual(
      expected
    );
  });

  test("正常系：認可されていない②", async () => {
    // 前準備
    const argument = new TokenExpiredError(FORBIDDEN, new Date());
    // 想定結果
    const expected = {
      code: 403,
      message: "forbidden",
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(errorService.getErrorType(argument)).resolves.toStrictEqual(
      expected
    );
  });

  test("正常系：何かのエラー", async () => {
    // 前準備
    const argument = new Error();
    // 想定結果
    const expected = {
      code: 500,
      message: "server error",
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(errorService.getErrorType(argument)).resolves.toStrictEqual(
      expected
    );
  });
});
