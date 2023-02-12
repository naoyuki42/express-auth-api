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
import { AuthMiddlewareClass } from "../api/middleware/AuthMiddleware";
/** ハンドラー */
import { UserHandlerClass } from "../api/handler/UserHandler";
import { HealthCheckHandlerClass } from "../api/handler/HealthCheckHandler";
import { ErrorHandlerClass } from "../api/handler/ErrorHandler";
import { AuthHandlerClass } from "../api/handler/AuthHandler";

const APIRouter = Router();

/** ミドルウェア */
const AuthMiddleware = new AuthMiddlewareClass();
/** ハンドラー */
const Auth = new AuthHandlerClass();
const User = new UserHandlerClass();
const HealthCheck = new HealthCheckHandlerClass();
const Error = new ErrorHandlerClass();

/** 認証 */
/** ログインAPI */
APIRouter.use(URI_AUTH_LOGIN, Auth.loginHandler);
/** ログアウトAPI */
APIRouter.use(URI_AUTH_LOGOUT, AuthMiddleware.authenticate, Auth.logoutHandler);

/** ユーザー */
/** ユーザー取得API */
APIRouter.get(URI_USER_GET, AuthMiddleware.authenticate, User.getHandler);
/** ユーザー作成API */
APIRouter.post(URI_USER_CREATE, User.createHandler);
/** ユーザー削除API */
APIRouter.delete(
  URI_USER_DELETE,
  AuthMiddleware.authenticate,
  User.deleteHandler
);

/** ヘルスチェック */
/** ヘルスチェックAPI */
APIRouter.get(URI_HEALTH_CHECK, HealthCheck.healthCheckHandler);

/** Not Found */
APIRouter.use(Error.notFoundHandler);
/** エラー */
APIRouter.use(Error.errorHandler);

export const router = Router().use(URI_PREFIX_API, APIRouter);
