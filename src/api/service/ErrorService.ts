import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import {
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_BAD_REQUEST,
} from "../../constants/HTTPStatus";
import {
  UNAUTHORIZED,
  FORBIDDEN,
  SERVER_ERROR,
  NOT_UNIQUE_NAME,
} from "../../constants/Message";

/** エラーサービスクラス */
export class ErrorService {
  /** エラーの種類の判定 */
  async getErrorType(err: Error): Promise<{ code: number; message: string }> {
    if (err.message === UNAUTHORIZED) {
      // 認証失敗
      return {
        code: HTTP_STATUS_UNAUTHORIZED,
        message: UNAUTHORIZED,
      };
    } else if (err instanceof (JsonWebTokenError || TokenExpiredError)) {
      // 認可されていない
      return {
        code: HTTP_STATUS_FORBIDDEN,
        message: FORBIDDEN,
      };
    } else if (err.message === NOT_UNIQUE_NAME) {
      // ユーザー名が一意ではない
      return {
        code: HTTP_STATUS_BAD_REQUEST,
        message: NOT_UNIQUE_NAME,
      };
    } else {
      // サーバーエラー
      return {
        code: HTTP_STATUS_SERVER_ERROR,
        message: SERVER_ERROR,
      };
    }
  }
}
