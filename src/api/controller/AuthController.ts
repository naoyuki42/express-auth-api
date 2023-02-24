import { Request } from "express";
import { hash } from "bcrypt";
import { Context } from "../../config/context";
import { AuthModel } from "../model/AuthModel";
import { AuthService } from "../service/AuthService";
import { TokenService } from "../service/TokenService";
import { HASHED_SALT_ROUNDS, TOKEN_EXPIRES_IN } from "../../config/env";
import {
  ResponseTypeChangePassword,
  ResponseTypeChangeUserName,
  ResponseTypeLogin,
  ResponseTypeLogout,
  ResponseTypeRegister,
  ResponseTypeUserDelete,
} from "../../types/response";

export class AuthController {
  private authModel: AuthModel;
  private authService: AuthService;
  private tokenService: TokenService;

  constructor(context: Context) {
    this.authModel = new AuthModel(context);
    this.authService = new AuthService();
    this.tokenService = new TokenService();
  }

  /** ログイン */
  async login(req: Request): Promise<ResponseTypeLogin> {
    // ログインユーザー情報の取得
    const { password } = await this.authModel.getUser(req.body.userName);
    // パスワードの検証
    await this.authService.comparePassword(req.body.password, password);
    // アクセストークンの作成
    const token = await this.tokenService.createToken(req.body.userName);
    // ログイン処理
    await this.authModel.login(req.body.userName);
    // レスポンスボディ
    const response: ResponseTypeLogin = {
      accessToken: token,
      expired: TOKEN_EXPIRES_IN,
    };
    return response;
  }

  /** ログアウト */
  async logout(req: Request): Promise<ResponseTypeLogout> {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await this.tokenService.subStringToken(
      req.headers.authorization
    );
    // アクセストークンのデコード
    const { userName } = await this.tokenService.verifyToken(accessToken);
    // ログアウト処理
    await this.authModel.logout(userName);
  }

  /** 認証 */
  async authenticate(req: Request): Promise<void> {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await this.tokenService.subStringToken(
      req.headers.authorization
    );
    // アクセストークンのデコード
    const { userName } = await this.tokenService.verifyToken(accessToken);
    // ログアウトフラグの取得
    const { isLogout } = await this.authModel.getIsLogout(userName);
    // 認証の実施
    await this.authService.authenticate(isLogout);
  }

  /** 会員登録 */
  async register(req: Request): Promise<ResponseTypeRegister> {
    // パスワードのハッシュ化
    const hashedPassword = await hash(req.body.password, HASHED_SALT_ROUNDS);
    // ユーザーの登録
    await this.authModel.register(req.body.userName, hashedPassword);
  }

  /** ユーザー名変更 */
  async changeUserName(req: Request): Promise<ResponseTypeChangeUserName> {
    // TODO:未実装
    return {
      userName: "1",
    };
  }

  /** パスワード変更 */
  async changePassword(req: Request): Promise<ResponseTypeChangePassword> {
    // TODO:未実装
  }

  /** 退会 */
  async userDelete(req: Request): Promise<ResponseTypeUserDelete> {
    // ユーザーの削除
    await this.authModel.userDelete(req.body.userName);
  }
}
