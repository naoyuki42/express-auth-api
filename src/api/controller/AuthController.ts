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
    const { id, password } = await this.authModel.getAuthUser(
      req.body.userName
    );
    // パスワードの検証
    await this.authService.comparePassword(req.body.password, password);
    // アクセストークンの発行
    const token = await this.tokenService.create(req.body.userName);
    // アクセストークンの保存
    await this.authModel.setToken(id, token);
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
    const accessToken = await this.tokenService.subString(
      req.headers.authorization
    );
    // アクセストークンのデコード
    const { user } = await this.tokenService.verify(accessToken);
    // DBからアクセストークンの削除
    await this.authModel.logout(user);
  }

  /** 認証 */
  async authenticate(req: Request): Promise<void> {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await this.tokenService.subString(
      req.headers.authorization
    );
    // アクセストークンのデコード
    const { user } = await this.tokenService.verify(accessToken);
    // DBからアクセストークンの取得
    const { token } = await this.authModel.getToken(user);
    // アクセストークンが一致しない場合エラー
    await this.tokenService.compareToken(accessToken, token);
  }
}
