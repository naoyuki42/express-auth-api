import { Router } from "express";

import {
  URI_AUTH_LOGIN,
  URI_AUTH_LOGOUT,
  URI_USER_GET,
  URI_USER_CREATE,
  URI_HEALTH_CHECK,
  URI_PREFIX_API,
} from "../constants/URI";

import { loginHandler } from "../api/auth/login/handler";
import { logoutHandler } from "../api/auth/logout/handler";

import { userCreateHandler } from "../api/user/create/handler";
import { userGetHandler } from "../api/user/get/handler";

import { healthCheckHandler } from "../api/healthCheck/handler";

import { authMiddleware } from "../middleware/auth/handler";

const APIRouter = Router();

// TODO: バリデーションのミドルウェアの追加

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

/** ヘルスチェック */
/** ヘルスチェックAPI */
APIRouter.get(URI_HEALTH_CHECK, healthCheckHandler);

const router = Router().use(URI_PREFIX_API, APIRouter);

export default router;
