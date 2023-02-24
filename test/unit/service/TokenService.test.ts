import { JsonWebTokenError, verify } from "jsonwebtoken";
import { TokenService } from "../../../src/api/service/TokenService";
import { FORBIDDEN } from "../../../src/constants/Message";
import { JWT_SECRET_KEY } from "../../../src/config/env";

describe("createTokenメソッド", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  test("正常系", async () => {
    // 前準備
    const argument = "naoyuki42";
    // 想定結果
    const expected = "naoyuki42";
    // 対象メソッドの呼び出し
    const received = await tokenService.createToken(argument);
    // 対象メソッドの戻り値がnullではないこと
    await expect(received).not.toBeNull();
    /** 対象メソッドの戻り値のデコード結果の型がStringではなく、
     *  userNameプロパティを持っていること、
     *  かつユーザー名が想定結果と同じであること */
    const receivedDecoded = await verify(received, JWT_SECRET_KEY);
    await expect(
      typeof receivedDecoded !== "string" &&
        "userName" in receivedDecoded &&
        receivedDecoded.userName
    ).toStrictEqual(expected);
  });
});

describe("subStringTokenメソッド", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  test("正常系", async () => {
    // 前準備
    const argument = "Bearer dummyToken";
    // 想定結果
    const expected = "dummyToken";
    // 対象メソッドの呼び出し
    const received = await tokenService.subStringToken(argument);
    // 対象メソッドの戻り値がnullではないこと
    await expect(received).toStrictEqual(expected);
  });

  test("異常系:引数がundefinedだった場合", async () => {
    // 前準備
    const argument = undefined;
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.subStringToken(argument)).rejects.toThrow(
      expected
    );
  });

  test("異常系:トークンのタイプがBearerトークンではなかった場合", async () => {
    // 前準備
    const argument = "notBearer dummyToken";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.subStringToken(argument)).rejects.toThrow(
      expected
    );
  });

  test("異常系:Bearerとトークンの間に半角スペースがなかった場合", async () => {
    // 前準備
    const argument = "BearerdummyToken";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.subStringToken(argument)).rejects.toThrow(
      expected
    );
  });
});

describe("verifyTokenメソッド", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  test("正常系", async () => {
    // 前準備
    const argument = await tokenService.createToken("naoyuki42");
    // 想定結果
    const expected = "naoyuki42";
    // 対象メソッドの呼び出し
    const received = await tokenService.verifyToken(argument);
    /** 対象メソッドの戻り値の型がStringではなく、
     * userNameプロパティを持っており、
     * 値が想定結果と一致していること */
    await expect(received.userName).toStrictEqual(expected);
  });

  test("異常系：トークンが無効だった場合", async () => {
    // 前準備
    const argument = "naoyuki42";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.verifyToken(argument)).rejects.toThrow(expected);
  });

  test("異常系:デコード結果がStringだった場合", async () => {
    // 前準備
    const argument = "naoyuki42";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(
      tokenService.verifyToken(argument).then(() => "dummyReturnValue")
    ).rejects.toThrow(expected);
  });

  test("異常系:デコード結果にuserプロパティが含まれていなかった場合", async () => {
    // 前準備
    const argument = "naoyuki42";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(
      tokenService.verifyToken(argument).then(() => {
        key: "Yeah!";
      })
    ).rejects.toThrow(expected);
  });
});
