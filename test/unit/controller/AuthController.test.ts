import { getMockReq } from "@jest-mock/express";
import { Context } from "../../../src/config/context";
import { MockContext, createMockContext } from "../../helper/mockContext";
import { AuthController } from "../../../src/api/controller/AuthController";
import { hash } from "bcrypt";
import { FORBIDDEN, UNAUTHORIZED } from "../../../src/constants/Message";
import { TokenService } from "../../../src/api/service/TokenService";

let mockContext: MockContext;
let controller: AuthController;

beforeEach(() => {
  mockContext = createMockContext();
  const context = mockContext as unknown as Context;
  controller = new AuthController(context);
});

describe("loginメソッド", () => {
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
      isLogout: true,
    };
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    const mockToken = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: false,
    };
    jest.spyOn(mockContext.prisma.user, "update").mockResolvedValue(mockToken);
    // 想定結果
    const expectedExpired = "1m";
    // 対象メソッドの呼び出し
    const received = await controller.login(request);
    // アクセストークンがNULLでないこと
    expect(received.accessToken).not.toBeNull();
    // expiredが想定結果と一致すること
    expect(received.expired).toStrictEqual(expectedExpired);
  });

  test("異常系：ユーザーが存在しない場合", async () => {
    // 前準備
    const request = getMockReq({
      body: {
        userName: "naoyuki42",
        password: "na0yuk1&42",
      },
    });
    const mockUser = null;
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = new Error(UNAUTHORIZED);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.login(request)).rejects.toThrow(expected);
  });

  test("異常系：ユーザーの取得でDBにエラーがあった場合", async () => {
    // 前準備
    const request = getMockReq({
      body: {
        userName: "naoyuki42",
        password: "na0yuk1&42",
      },
    });
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.login(request)).rejects.toThrow(expected);
  });

  test("異常系：ユーザーが存在したがパスワードが異なる", async () => {
    // 前準備
    const request = getMockReq({
      body: {
        userName: "naoyuki42",
        password: "dummy",
      },
    });
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: true,
    };
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = new Error(UNAUTHORIZED);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.login(request)).rejects.toThrow(expected);
  });

  test("異常系：ログイン処理でDBにエラーがあった場合", async () => {
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
      isLogout: true,
    };
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    jest
      .spyOn(mockContext.prisma.user, "update")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.login(request)).rejects.toThrow(expected);
  });
});

describe("logoutメソッド", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  test("正常系", async () => {
    // 前準備
    const token = await tokenService.createToken("naoyuki42");
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: true,
    };
    jest.spyOn(mockContext.prisma.user, "update").mockResolvedValue(mockUser);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.logout(request)).resolves.not.toThrowError();
  });

  test("異常系：トークンがBearerトークンではない", async () => {
    // 前準備
    const token = await tokenService.createToken("naoyuki42");
    const request = getMockReq({
      headers: {
        authorization: `naonao ${token}`,
      },
    });
    const expected = new Error(FORBIDDEN);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.logout(request)).rejects.toThrow(expected);
  });

  test("異常系：トークンが有効ではない", async () => {
    // 前準備
    const token = "dummyToken";
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const expected = new Error(FORBIDDEN);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.logout(request)).rejects.toThrow(expected);
  });

  test("異常系：ログアウト処理でエラーがあった場合", async () => {
    // 前準備
    const token = await tokenService.createToken("naoyuki42");
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    jest
      .spyOn(mockContext.prisma.user, "update")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.logout(request)).rejects.toThrow(expected);
  });
});

describe("authenticateメソッド", () => {
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  test("正常系", async () => {
    // 前準備
    const token = await tokenService.createToken("naoyuki42");
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
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
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.authenticate(request)).resolves.not.toThrowError();
  });

  test("異常系：ユーザーがログアウトしている", async () => {
    // 前準備
    const token = await tokenService.createToken("naoyuki42");
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: true,
    };
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockResolvedValue(mockUser);
    // 想定結果
    const expected = new Error(UNAUTHORIZED);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.authenticate(request)).rejects.toThrow(expected);
  });

  test("異常系：トークンがBearerトークンではない", async () => {
    // 前準備
    const token = await tokenService.createToken("naoyuki42");
    const request = getMockReq({
      headers: {
        authorization: `naonao ${token}`,
      },
    });
    // 想定結果
    const expected = new Error(FORBIDDEN);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.authenticate(request)).rejects.toThrow(expected);
  });

  test("異常系：トークンが有効ではない", async () => {
    // 前準備
    const token = "dummyToken";
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    // 想定結果
    const expected = new Error(FORBIDDEN);
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.authenticate(request)).rejects.toThrow(expected);
  });

  test("異常系：ユーザーの取得でDBにエラーがあった場合", async () => {
    // 前準備
    const token = await tokenService.createToken("naoyuki42");
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    jest
      .spyOn(mockContext.prisma.user, "findUnique")
      .mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(controller.authenticate(request)).rejects.toThrow(expected);
  });
});

describe("registerメソッド", () => {
  test("正常系:ユーザーを作成出来た場合", async () => {
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
    await expect(controller.register(request)).resolves.not.toThrowError();
  });

  test("異常系:ユーザーを作成出来なかった場合", async () => {
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
    await expect(controller.register(request)).rejects.toThrow(expected);
  });
});

describe("userDeleteメソッド", () => {
  test("正常系", async () => {
    // 前準備
    const request = getMockReq({
      body: {
        userName: "naoyuki42",
      },
    });
    const hashedPassword = await hash("na0yuk1&42", 10);
    const mockUser = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      isLogout: false,
    };
    jest.spyOn(mockContext.prisma.user, "delete").mockResolvedValue(mockUser);
    // 対象メソッドがエラーを返さないこと
    await expect(controller.userDelete(request)).resolves.not.toThrowError();
  });

  test("異常系:ユーザーを削除出来なかった場合", async () => {
    // 前準備
    const request = getMockReq({
      body: {
        userName: "naoyuki42",
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
