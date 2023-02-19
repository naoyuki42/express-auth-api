import { Request } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { AuthModel } from "../model/AuthModel";
import { AuthService } from "../service/AuthService";
import { TokenService } from "../service/TokenService";
import { FORBIDDEN, UNAUTHORIZED } from "../../constants/Message";
import { TOKEN_EXPIRES_IN } from "../../env";
import { ResponseTypeLogin, ResponseTypeLogout } from "../../types/response";
import { createContext } from "../../context";

export class AuthController {
  authModel: AuthModel;
  authService: AuthService;
  tokenService: TokenService;

  constructor() {
    this.authModel = new AuthModel(createContext());
    this.authService = new AuthService();
    this.tokenService = new TokenService();
  }

  /** ログイン */
  async login(req: Request): Promise<ResponseTypeLogin> {
    // ログインユーザー情報の取得
    const authUser = await this.authModel.getAuthUser(req.body.userName);
    if (authUser === null) throw new Error(UNAUTHORIZED);

    // パスワードの検証
    await this.authService.comparePassword(
      req.body.password,
      authUser.password
    );

    // アクセストークンの発行と保存
    const token = await this.tokenService.create(req.body.userName);
    await this.authModel.setToken(authUser.id, token).catch(() => {
      throw new Error(UNAUTHORIZED);
    });

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
    const decoded = await this.tokenService.verify(accessToken);

    // DBからアクセストークンの取得
    const result = await this.authModel.getToken(decoded.user);
    if (result === null) throw new JsonWebTokenError(FORBIDDEN);

    // アクセストークンが一致しない場合エラー
    await this.tokenService.compareToken(accessToken, result.token);
  }
}
