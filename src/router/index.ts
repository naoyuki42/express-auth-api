/** ライブラリ */
import { Router } from "express";
import { checkSchema } from "express-validator";
/** URI */
import {
  URI_AUTH_LOGIN,
  URI_AUTH_LOGOUT,
  URI_USER_GET,
  URI_HEALTH_CHECK,
  URI_PREFIX_API,
  URI_AUTH_REGISTER,
  URI_AUTH_CHANGE_PASSWORD,
  URI_AUTH_USER_DELETE,
  URI_AUTH_CHANGE_USER_NAME,
} from "../constants/URI";
/** ミドルウェア */
import { authMiddleware } from "../api/middleware/auth";
import { validationMiddleware } from "../api/middleware/validation";
/** バリデーションスキーマ */
import { Login, UserGet } from "../constants/validationRule";
/** ハンドラー */
import { loginHandler } from "../api/handler/auth/login";
import { logoutHandler } from "../api/handler/auth/logout";
import { registerHandler } from "../api/handler/auth/register";
import { changePasswordHandler } from "../api/handler/auth/changePassword";
import { changeUserNameHandler } from "../api/handler/auth/changeUserName";
import { userDeleteHandler } from "../api/handler/auth/userDelete";
import { userGetHandler } from "../api/handler/user/get";
import { healthCheckHandler } from "../api/handler/healthCheck";
import { errorHandler } from "../api/handler/error/error";
import { notFoundHandler } from "../api/handler/error/notFound";

const APIRouter = Router();

/** 認証 */
/** ログインAPI */
APIRouter.post(
  URI_AUTH_LOGIN,
  checkSchema(Login),
  validationMiddleware,
  loginHandler
);
/** ログアウトAPI */
APIRouter.post(URI_AUTH_LOGOUT, authMiddleware, logoutHandler);
/** 会員登録API */
APIRouter.post(URI_AUTH_REGISTER, registerHandler);
/** ユーザー名変更API */
APIRouter.put(URI_AUTH_CHANGE_USER_NAME, authMiddleware, changeUserNameHandler);
/** パスワード変更API */
APIRouter.put(URI_AUTH_CHANGE_PASSWORD, authMiddleware, changePasswordHandler);
/** 退会API */
APIRouter.delete(URI_AUTH_USER_DELETE, authMiddleware, userDeleteHandler);

/** ユーザー */
/** ユーザー取得API */
APIRouter.get(
  URI_USER_GET,
  checkSchema(UserGet),
  validationMiddleware,
  authMiddleware,
  userGetHandler
);

/** ヘルスチェック */
/** ヘルスチェックAPI */
APIRouter.get(URI_HEALTH_CHECK, healthCheckHandler);

export const router = Router()
  .use(URI_PREFIX_API, APIRouter)
  /** エラーハンドリング */
  .use(errorHandler)
  /** Not Found */
  .use(notFoundHandler);
