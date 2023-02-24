import { hash } from "bcrypt";
import { AuthService } from "../../../src/api/service/AuthService";
import { UNAUTHORIZED } from "../../../src/constants/Message";
import { HASHED_SALT_ROUNDS } from "../../../src/config/env";

describe("comparePasswordメソッド", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  test("正常系", async () => {
    // 前準備
    const argument1 = "password";
    const argument2 = await hash("password", HASHED_SALT_ROUNDS);
    // 対象メソッドがエラーを返さないこと
    await expect(
      authService.comparePassword(argument1, argument2)
    ).resolves.not.toThrowError();
  });

  test("異常系：比較するパスワードが異なる文字列だった場合", async () => {
    // 前準備
    const argument1 = "password";
    const argument2 = await hash("naonao", HASHED_SALT_ROUNDS);
    // 想定結果
    const expected = new Error(UNAUTHORIZED);
    // 対象メソッドが想定のエラーを返すこと
    await expect(
      authService.comparePassword(argument1, argument2)
    ).rejects.toThrow(expected);
  });
});

describe("authenticateメソッド", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  test("正常系", async () => {
    // 前準備
    const argument = false;
    // 対象メソッドがエラーを返さないこと
    await expect(
      authService.authenticate(argument)
    ).resolves.not.toThrowError();
  });

  test("異常系", async () => {
    // 前準備
    const argument = true;
    // 想定結果
    const expected = new Error(UNAUTHORIZED);
    // 対象メソッドが想定のエラーを返すこと
    await expect(authService.authenticate(argument)).rejects.toThrow(expected);
  });
});
