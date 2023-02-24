import { hash } from "bcrypt";
import { Context } from "../../../src/config/context";
import { createMockContext, MockContext } from "../../helper/mockContext";
import { AuthModel } from "../../../src/api/model/AuthModel";
import { UNAUTHORIZED } from "../../../src/constants/Message";

let mockContext: MockContext;
let authModel: AuthModel;

beforeEach(() => {
  mockContext = createMockContext();
  const context = mockContext as unknown as Context;
  authModel = new AuthModel(context);
});

describe("getUserメソッド", () => {
  test("正常系:ユーザーを取得出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: false,
    };
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: false,
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getUser("naoyuki42")).resolves.toStrictEqual(
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
    await expect(authModel.getUser("naoyuki42")).rejects.toThrow(expected);
  });

  test("異常系:findUniqueメソッドがエラーになった場合", async () => {
    // 前準備
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.getUser("naoyuki42")).rejects.toThrow(expected);
  });
});

describe("loginメソッド", () => {
  test("正常系:ユーザーを取得出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: false,
    };
    jest.spyOn(mockContext.prisma.user, "update").mockResolvedValue(mockUser);
    // 対象メソッドがエラーを返さないこと
    await expect(authModel.login("naoyuki42")).resolves.not.toThrowError();
  });

  test("異常系:DBでエラーがあった場合", async () => {
    // 前準備
    jest
      .spyOn(mockContext.prisma.user, "update")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.login("naoyuki42")).rejects.toThrow(expected);
  });
});

describe("logoutメソッド", () => {
  test("正常系:ユーザーを取得出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: true,
    };
    jest.spyOn(mockContext.prisma.user, "update").mockResolvedValue(mockUser);
    // 対象メソッドがエラーを返さないこと
    await expect(authModel.logout("naoyuki42")).resolves.not.toThrowError();
  });

  test("異常系:DBでエラーがあった場合", async () => {
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

describe("registerメソッド", () => {
  test("正常系:ユーザーを作成出来た場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: false,
    };
    jest.spyOn(mockContext.prisma.user, "create").mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: null,
    };
    // 対象メソッドがエラーを返さないこと
    await expect(
      authModel.register("naoyuki42", hashedPassword)
    ).resolves.not.toThrowError();
  });

  test("異常系:ユーザーを作成出来なかった場合", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    jest
      .spyOn(mockContext.prisma.user, "create")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(
      authModel.register("naoyuki42", hashedPassword)
    ).rejects.toThrow(expected);
  });
});

describe("userDeleteメソッド", () => {
  test("正常系", async () => {
    // 前準備
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: false,
    };
    jest.spyOn(mockContext.prisma.user, "delete").mockResolvedValue(mockUser);
    // 対象メソッドがエラーを返さないこと
    await expect(authModel.userDelete("naoyuki42")).resolves.not.toThrowError();
  });

  test("異常系:ユーザーを削除出来なかった場合", async () => {
    // 前準備
    jest
      .spyOn(mockContext.prisma.user, "delete")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(authModel.userDelete("naoyuki42")).rejects.toThrow(expected);
  });
});
