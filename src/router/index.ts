/** ライブラリ */
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
/** ミドルウェア */
import { authMiddleware } from "../api/middleware/auth";
/** ハンドラー */
import { loginHandler } from "../api/handler/auth/login";
import { logoutHandler } from "../api/handler/auth/logout";
import { userGetHandler } from "../api/handler/user/get";
import { userCreateHandler } from "../api/handler/user/create";
import { userDeleteHandler } from "../api/handler/user/delete";
import { healthCheckHandler } from "../api/handler/healthCheck";
import { errorHandler } from "../api/handler/error/error";
import { notFoundHandler } from "../api/handler/error/notFound";

const APIRouter = Router();

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

/** Not Found */
APIRouter.use(notFoundHandler);
/** エラー */
APIRouter.use(errorHandler);

export const router = Router().use(URI_PREFIX_API, APIRouter);
