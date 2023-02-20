import { getMockReq } from "@jest-mock/express";
import { hash } from "bcrypt";
import { Context } from "../../../src/context";
import { MockContext, createMockContext } from "../../helper/mockContext";
import { UserController } from "../../../src/api/controller/UserController";
import { USER_NOT_FOUND } from "../../../src/constants/Message";

describe("userGetメソッド", () => {
  let mockContext: MockContext;
  let controller: UserController;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    controller = new UserController(context);
  });

  test("正常系", async () => {
    // 前準備
    const request = getMockReq({
      params: {
        userId: "1",
      },
    });
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
      userId: 1,
      userName: "naoyuki42",
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.userGet(request)).resolves.toStrictEqual(expected);
  });

  test("異常系:パスパラメータのユーザーIDのユーザーが存在しない場合", async () => {
    // 前準備
    const request = getMockReq({
      params: {
        userId: "1",
      },
    });
    const mockUser = null;
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = new Error(USER_NOT_FOUND);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.userGet(request)).rejects.toThrow(expected);
  });

  test("異常系:DBからエラーがあった場合", async () => {
    // 前準備
    const request = getMockReq({
      params: {
        userId: "1",
      },
    });
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.userGet(request)).rejects.toThrow(expected);
  });
});

describe("userCreateメソッド", () => {
  let mockContext: MockContext;
  let controller: UserController;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    controller = new UserController(context);
  });

  test("正常系", async () => {
    // 前準備
    const request = getMockReq({
      body: {
        userName: "naoyuki42",
        password: "na0yuk1&42",
      },
    });
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: null,
    };
    jest.spyOn(mockContext.prisma.user, "create").mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      userId: 1,
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.userCreate(request)).resolves.toStrictEqual(
      expected
    );
  });

  test("異常系:DBからエラーがあった場合", async () => {
    // 前準備
    const request = getMockReq({
      body: {
        userName: "naoyuki42",
        password: "na0yuk1&42",
      },
    });
    jest
      .spyOn(mockContext.prisma.user, "create")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.userCreate(request)).rejects.toThrow(expected);
  });
});

describe("userDeleteメソッド", () => {
  let mockContext: MockContext;
  let controller: UserController;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    controller = new UserController(context);
  });

  test("正常系", async () => {
    // 前準備
    const request = getMockReq({
      params: {
        userId: "1",
      },
    });
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: "na0yuk1&42",
      token: null,
    };
    jest.spyOn(mockContext.prisma.user, "delete").mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      userId: 1,
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.userDelete(request)).resolves.not.toThrowError();
  });

  test("異常系:DBからエラーがあった場合", async () => {
    // 前準備
    const request = getMockReq({
      params: {
        userId: "1",
      },
    });
    jest
      .spyOn(mockContext.prisma.user, "delete")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.userDelete(request)).rejects.toThrow(expected);
  });
});
