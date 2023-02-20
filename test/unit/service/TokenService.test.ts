import { JsonWebTokenError, verify } from "jsonwebtoken";
import { TokenService } from "../../../src/api/service/TokenService";
import { FORBIDDEN } from "../../../src/constants/Message";
import { JWT_SECRET_KEY } from "../../../src/config/env";

describe("createメソッド", () => {
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
    const received = await tokenService.create(argument);
    // 対象メソッドの戻り値がnullではないこと
    await expect(received).not.toBeNull();
    /** 対象メソッドの戻り値のデコード結果の型がStringではなく、
     *  userプロパティを持っていること、
     *  かつユーザー名が想定結果と同じであること */
    const receivedDecoded = await verify(received, JWT_SECRET_KEY);
    await expect(
      typeof receivedDecoded !== "string" &&
        "user" in receivedDecoded &&
        receivedDecoded.user
    ).toStrictEqual(expected);
  });
});

describe("subStringメソッド", () => {
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
    const received = await tokenService.subString(argument);
    // 対象メソッドの戻り値がnullではないこと
    await expect(received).toStrictEqual(expected);
  });

  test("異常系:引数がundefinedだった場合", async () => {
    // 前準備
    const argument = undefined;
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.subString(argument)).rejects.toThrow(expected);
  });

  test("異常系:トークンのタイプがBearerトークンではなかった場合", async () => {
    // 前準備
    const argument = "notBearer dummyToken";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.subString(argument)).rejects.toThrow(expected);
  });

  test("異常系:Bearerとトークンの間に半角スペースがなかった場合", async () => {
    // 前準備
    const argument = "BearerdummyToken";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.subString(argument)).rejects.toThrow(expected);
  });
});

describe("verifyメソッド", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  test("正常系", async () => {
    // 前準備
    const argument = await tokenService.create("naoyuki42");
    // 想定結果
    const expected = "naoyuki42";
    // 対象メソッドの呼び出し
    const received = await tokenService.verify(argument);
    /** 対象メソッドの戻り値の型がStringではなく、
     * userプロパティを持っており、
     * 値が想定結果と一致していること */
    await expect(received.user).toStrictEqual(expected);
  });

  test("異常系：トークンが無効だった場合", async () => {
    // 前準備
    const argument = "naoyuki42";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(tokenService.verify(argument)).rejects.toThrow(expected);
  });

  test("異常系:デコード結果がStringだった場合", async () => {
    // 前準備
    const argument = "naoyuki42";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(
      tokenService.verify(argument).then(() => "dummyReturnValue")
    ).rejects.toThrow(expected);
  });

  test("異常系:デコード結果にuserプロパティが含まれていなかった場合", async () => {
    // 前準備
    const argument = "naoyuki42";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(
      tokenService.verify(argument).then(() => {
        key: "Yeah!";
      })
    ).rejects.toThrow(expected);
  });
});

describe("compareTokenメソッド", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  test("正常系", async () => {
    // 前準備
    const argument1 = "dummyToken";
    const argument2 = "dummyToken";
    // 対象メソッドがエラーを返さないこと
    await expect(
      tokenService.compareToken(argument1, argument2)
    ).resolves.not.toThrowError();
  });

  test("異常系：トークンが無効だった場合", async () => {
    // 前準備
    const argument1 = "dummyToken1";
    const argument2 = "dummyToken2";
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(
      tokenService.compareToken(argument1, argument2)
    ).rejects.toThrow(expected);
  });

  test("異常系：トークンが存在しなかった場合", async () => {
    // 前準備
    const argument1 = "dummyToken1";
    const argument2 = null;
    // 想定結果
    const expected = new JsonWebTokenError(FORBIDDEN);
    // 対象メソッドが想定のエラーを返すこと
    await expect(
      tokenService.compareToken(argument1, argument2)
    ).rejects.toThrow(expected);
  });
});
