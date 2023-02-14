import { Request, Response, NextFunction } from "express";
import { Schema, checkSchema, validationResult } from "express-validator";

import {
  LoginRuleSchema,
  LogoutRuleSchema,
  UserCreateRuleSchema,
  UserDeleteRuleSchema,
  UserGetRuleSchema,
} from "./validationSchema";

import {
  URI_AUTH_LOGIN,
  URI_AUTH_LOGOUT,
  URI_PREFIX_API,
  URI_USER_CREATE,
  URI_USER_DELETE,
  URI_USER_GET,
} from "../../../constants/URI";
import { HTTP_STATUS_BAD_REQUEST } from "../../../constants/HTTPStatus";
import { BAD_REQUEST, FAILED_TO_VALIDATE } from "../../../constants/Message";

import { ResponseError } from "../../../types/response";

export class ValidateMiddleware {
  /** バリデーションの実施 */
  async validation(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // パス毎のバリデーションルールを取得
      const path = await req.originalUrl.replace(URI_PREFIX_API, "");
      const ruleSchema = await getRuleSchema(path).then((rule) => {
        if (rule === undefined) throw FAILED_TO_VALIDATE;
        return rule;
      });
      // バリデーションの実施
      const result = await checkSchema(ruleSchema);
      await validationResult(result).throw();
      next();
    } catch (err: unknown) {
      next(err);
    }
  }
  /** バリデーション結果の判定 */
  // TODO:判定出来ていない
  async handleValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await validationResult(req).throw();
      next();
    } catch (err: unknown) {
      const response: ResponseError = {
        error: {
          code: HTTP_STATUS_BAD_REQUEST,
          message: BAD_REQUEST,
        },
      };
      res.status(HTTP_STATUS_BAD_REQUEST).json(response);
    }
  }
}

// TODO:サービスクラスに切り出し
/** バリデーションルールの取得 */
const getRuleSchema = async (path: string): Promise<Schema | undefined> => {
  switch (path) {
    case URI_AUTH_LOGIN:
      return LoginRuleSchema;
    case URI_AUTH_LOGOUT:
      return LogoutRuleSchema;
    case URI_USER_GET:
      return UserGetRuleSchema;
    case URI_USER_CREATE:
      return UserCreateRuleSchema;
    case URI_USER_DELETE:
      return UserDeleteRuleSchema;
    default:
      return undefined;
  }
};
