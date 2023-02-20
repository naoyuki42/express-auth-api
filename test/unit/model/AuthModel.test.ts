import { hash } from "bcrypt";
import { Context } from "../../../src/config/context";
import { createMockContext, MockContext } from "../../helper/mockContext";
import { AuthModel } from "../../../src/api/model/AuthModel";
import { UNAUTHORIZED } from "../../../src/constants/Message";

describe("getAuthUserメソッド", () => {
  let mockContext: MockContext;
  let authModel: AuthModel;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    authModel = new AuthModel(context);
  });

  test("正常系:ユーザーを取得出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: null,
    };
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: null,
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getAuthUser("naoyuki42")).resolves.toStrictEqual(
      expected
    );
  });

  test("異常系:findUniqueメソッドの戻り値がnullの場合", async () => {
    // 前準備
    const mockUser = null;
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = new Error(UNAUTHORIZED);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getAuthUser("naoyuki42")).rejects.toThrow(expected);
  });

  test("異常系:findUniqueメソッドがエラーになった場合", async () => {
    // 前準備
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getAuthUser("naoyuki42")).rejects.toThrow(expected);
  });
});

describe("setTokenメソッド", () => {
  let mockContext: MockContext;
  let authModel: AuthModel;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    authModel = new AuthModel(context);
  });

  test("正常系:ユーザーを取得出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: "dummyToken",
    };
    jest.spyOn(mockContext.prisma.user, "update").mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: "dummyToken",
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.setToken(1, "dummyToken")).resolves.toStrictEqual(
      expected
    );
  });

  test("異常系:findUniqueメソッドがエラーになった場合", async () => {
    // 前準備
    jest
      .spyOn(mockContext.prisma.user, "update")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.setToken(1, "dummyToken")).rejects.toThrow(expected);
  });
});

describe("getTokenメソッド", () => {
  let mockContext: MockContext;
  let authModel: AuthModel;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    authModel = new AuthModel(context);
  });

  test("正常系:ユーザーを取得出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: "dummyToken",
    };
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: "dummyToken",
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getToken("naoyuki42")).resolves.toStrictEqual(
      expected
    );
  });

  test("異常系:findUniqueメソッドの戻り値がnullの場合", async () => {
    // 前準備
    const mockUser = null;
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = new Error(UNAUTHORIZED);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getToken("naoyuki42")).rejects.toThrow(expected);
  });

  test("異常系:findUniqueメソッドがエラーになった場合", async () => {
    // 前準備
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getToken("naoyuki42")).rejects.toThrow(expected);
  });
});

describe("logoutメソッド", () => {
  let mockContext: MockContext;
  let authModel: AuthModel;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    authModel = new AuthModel(context);
  });

  test("正常系:ユーザーを取得出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: null,
    };
    jest.spyOn(mockContext.prisma.user, "update").mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: null,
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.logout("naoyuki42")).resolves.toStrictEqual(
      expected
    );
  });

  test("異常系:findUniqueメソッドがエラーになった場合", async () => {
    // 前準備
    jest
      .spyOn(mockContext.prisma.user, "update")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.logout("naoyuki42")).rejects.toThrow(expected);
  });
});
