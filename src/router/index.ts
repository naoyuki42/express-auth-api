import { Router } from "express";
/** URI */
import {
  URI_AUTH_LOGIN,
  URI_AUTH_LOGOUT,
  URI_USER_GET,
  URI_USER_CREATE,
  URI_USER_DELETE,
  URI_HEALTH_CHECK,
  URI_PREFIX_API,
} from "../constants/URI";
/** ハンドラー：認証 */
import { loginHandler } from "../api/auth/login/handler";
import { logoutHandler } from "../api/auth/logout/handler";
/** ハンドラー：ユーザー */
import { userGetHandler } from "../api/user/get/handler";
import { userCreateHandler } from "../api/user/create/handler";
import { userDeleteHandler } from "../api/user/delete/handler";
/** ハンドラー：ヘルスチェック */
import { healthCheckHandler } from "../api/healthCheck/handler";
/** ハンドラー：エラー */
import { errorHandler } from "../api/error/error/handler";
import { notFoundHandler } from "../api/error/notFound/handler";
/** ミドルウェア：認証 */
import { authMiddleware } from "../middleware/auth/handler";

const APIRouter = Router();

// TODO:モデル、サービスのクラス化
// TODO:バリデーションのミドルウェアの追加

/** 認証 */
/** ログインAPI */
APIRouter.use(URI_AUTH_LOGIN, loginHandler);
/** ログアウトAPI */
APIRouter.use(URI_AUTH_LOGOUT, authMiddleware, logoutHandler);

/** ユーザー */
/** ユーザー取得API */
APIRouter.get(URI_USER_GET, authMiddleware, userGetHandler);
/** ユーザー作成API */
APIRouter.post(URI_USER_CREATE, userCreateHandler);
/** ユーザー削除API */
APIRouter.delete(URI_USER_DELETE, authMiddleware, userDeleteHandler);

/** ヘルスチェック */
/** ヘルスチェックAPI */
APIRouter.get(URI_HEALTH_CHECK, healthCheckHandler);

/** エラー */
APIRouter.use(notFoundHandler);
APIRouter.use(errorHandler);

export const router = Router().use(URI_PREFIX_API, APIRouter);
