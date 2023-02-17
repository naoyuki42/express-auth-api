import { Request } from "express";
import { compare } from "bcrypt";
import { JsonWebTokenError } from "jsonwebtoken";
import { AuthModel } from "../model/AuthModel";
import { TokenService } from "../service/TokenService";
import {
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
} from "../../constants/HTTPStatus";
import { FORBIDDEN, UNAUTHORIZED } from "../../constants/Message";
import { TOKEN_EXPIRES_IN } from "../../env";
import { ResponseType, Logout, Login } from "../../types/response";

export class AuthController {
  authModel: AuthModel;
  tokenService: TokenService;

  constructor() {
    this.authModel = new AuthModel();
    this.tokenService = new TokenService();
  }

  /** ログイン */
  async login(req: Request): Promise<ResponseType<Login>> {
    // ログインユーザー情報の取得
    const authUser = await this.authModel.getAuthUser(req.body.userName);
    if (authUser === null) throw new Error(UNAUTHORIZED);

    // パスワードの検証
    const isPasswordCompare = await compare(
      req.body.password,
      authUser.password
    );
    if (!isPasswordCompare) throw new Error(UNAUTHORIZED);

    // アクセストークンの発行と保存
    const token = await this.tokenService.create(req.body.userName);
    const setTokenResult = await this.authModel.setToken(authUser.id, token);
    if (setTokenResult === null) throw new Error(UNAUTHORIZED);

    const response: ResponseType<Login> = {
      status: HTTP_STATUS_OK,
      body: {
        accessToken: token,
        expired: TOKEN_EXPIRES_IN,
      },
    };
    return response;
  }

  /** ログアウト */
  async logout(req: Request): Promise<ResponseType<Logout>> {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await this.tokenService.subString(
      req.headers.authorization
    );
    if (accessToken === undefined) throw new Error();

    // アクセストークンのデコード
    const decoded = await this.tokenService.verify(accessToken);
    if (typeof decoded === "string" || !("user" in decoded)) throw new Error();

    // DBからアクセストークンの削除
    const logoutUser = await this.authModel.logout(decoded.user);
    if (logoutUser === null) throw new Error();

    const response: ResponseType<Logout> = {
      status: HTTP_STATUS_NO_CONTENT,
    };
    return response;
  }

  /** 認証 */
  async authenticate(req: Request): Promise<void> {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await this.tokenService.subString(
      req.headers.authorization
    );
    if (accessToken === undefined) throw new Error();

    // アクセストークンのデコード
    const decoded = await this.tokenService.verify(accessToken);
    if (typeof decoded === "string" || !("user" in decoded)) throw new Error();

    // DBからアクセストークンの取得
    const result = await this.authModel.getToken(decoded.user);
    if (result === null) throw new JsonWebTokenError(FORBIDDEN);

    // アクセストークンが一致しない場合エラー
    if (accessToken !== result.token) throw new JsonWebTokenError(FORBIDDEN);
  }
}
