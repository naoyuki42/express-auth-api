import { Request } from "express";
import { Context } from "../../config/context";
import { AuthModel } from "../model/AuthModel";
import { AuthService } from "../service/AuthService";
import { TokenService } from "../service/TokenService";
import { TOKEN_EXPIRES_IN } from "../../config/env";
import { ResponseTypeLogin, ResponseTypeLogout } from "../../types/response";

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
}
