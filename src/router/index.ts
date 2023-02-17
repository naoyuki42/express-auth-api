/** ライブラリ */
import { Router } from "express";
import { checkSchema } from "express-validator";
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
import { validationMiddleware } from "../api/middleware/validation";
/** バリデーションスキーマ */
import {
  Login,
  UserCreate,
  UserDelete,
  UserGet,
} from "../constants/validationRule";
/** ハンドラー */
import { loginHandler, logoutHandler } from "../api/handler/auth";
import {
  userGetHandler,
  userCreateHandler,
  userDeleteHandler,
} from "../api/handler/user";
import { healthCheckHandler } from "../api/handler/healthCheck";
import { errorHandler, notFoundHandler } from "../api/handler/error";

const APIRouter = Router();

/** 認証 */
/** ログインAPI */
APIRouter.use(
  URI_AUTH_LOGIN,
  checkSchema(Login),
  validationMiddleware,
  loginHandler
);
/** ログアウトAPI */
APIRouter.use(URI_AUTH_LOGOUT, authMiddleware, logoutHandler);

/** ユーザー */
/** ユーザー取得API */
APIRouter.get(
  URI_USER_GET,
  checkSchema(UserGet),
  validationMiddleware,
  authMiddleware,
  userGetHandler
);
/** ユーザー作成API */
APIRouter.post(
  URI_USER_CREATE,
  checkSchema(UserCreate),
  validationMiddleware,
  userCreateHandler
);
/** ユーザー削除API */
APIRouter.delete(
  URI_USER_DELETE,
  checkSchema(UserDelete),
  validationMiddleware,
  authMiddleware,
  userDeleteHandler
);

/** ヘルスチェック */
/** ヘルスチェックAPI */
APIRouter.get(URI_HEALTH_CHECK, healthCheckHandler);

/** エラー */
APIRouter.use(errorHandler);
/** Not Found */
APIRouter.use(notFoundHandler);

export const router = Router().use(URI_PREFIX_API, APIRouter);
