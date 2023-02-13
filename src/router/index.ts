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
import { AuthMiddleware } from "../api/middleware/AuthMiddleware";
/** コントローラー */
import { UserController } from "../api/controller/UserController";
import { HealthCheckController } from "../api/controller/HealthCheckController";
import { ErrorController } from "../api/controller/ErrorController";
import { AuthController } from "../api/controller/AuthController";

const APIRouter = Router();

/** ミドルウェア */
const AuthMiddle = new AuthMiddleware();
/** コントローラー */
const Auth = new AuthController();
const User = new UserController();
const HealthCheck = new HealthCheckController();
const Error = new ErrorController();

/** 認証 */
/** ログインAPI */
APIRouter.use(URI_AUTH_LOGIN, Auth.loginHandler);
/** ログアウトAPI */
APIRouter.use(URI_AUTH_LOGOUT, AuthMiddle.authenticate, Auth.logoutHandler);

/** ユーザー */
/** ユーザー取得API */
APIRouter.get(URI_USER_GET, AuthMiddle.authenticate, User.getHandler);
/** ユーザー作成API */
APIRouter.post(URI_USER_CREATE, User.createHandler);
/** ユーザー削除API */
APIRouter.delete(URI_USER_DELETE, AuthMiddle.authenticate, User.deleteHandler);

/** ヘルスチェック */
/** ヘルスチェックAPI */
APIRouter.get(URI_HEALTH_CHECK, HealthCheck.healthCheckHandler);

/** Not Found */
APIRouter.use(Error.notFoundHandler);
/** エラー */
APIRouter.use(Error.errorHandler);

export const router = Router().use(URI_PREFIX_API, APIRouter);
