import { hash } from "bcrypt";
import { Context } from "../../../src/context";
import { createMockContext, MockContext } from "../../helper/mockContext";
import { UserModel } from "../../../src/api/model/UserModel";

describe("getメソッド", () => {
  let mockContext: MockContext;
  let userModel: UserModel;

  beforeEach(() => {
    mockContext = createMockContext();
    const context = mockContext as unknown as Context;
    userModel = new UserModel(context.prisma);
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
    mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
    // 想定結果
    const expected = {
      id: 1,
      name: "naoyuki42",
      password: hashedPassword,
      token: null,
    };
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(userModel.get(1)).resolves.toStrictEqual(expected);
  });

  test("異常系:ユーザーを取得出来なかった場合", async () => {
    // 前準備
    const mockUser = null;
    mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
    // 想定結果
    const expected = null;
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(userModel.get(1)).resolves.toStrictEqual(expected);
  });

  test("異常系:findUniqueメソッドがエラーになった場合", async () => {
    // 前準備
    mockContext.prisma.user.findUnique.mockRejectedValue(new Error());
    // 想定結果
    const expected = new Error();
    // 対象メソッドの戻り値が想定結果と同じであること
    await expect(userModel.get(1)).rejects.toThrow(expected);
  });
});
