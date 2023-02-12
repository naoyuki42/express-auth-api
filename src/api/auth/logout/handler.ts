import { NextFunction, Request, Response } from "express";

import {
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_SERVER_ERROR,
} from "../../../constants/HTTPStatus";
import { SERVER_ERROR } from "../../../constants/Message";
import { ResponseError } from "../../../types/response";
import { subStringToken } from "../../../common/token/subStringToken";
import { verifyToken } from "../../../common/token/verifyToken";
import { logoutModel } from "./model";

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Authorizationヘッダーからアクセストークンを抽出
    const accessToken = await subStringToken(req.headers.authorization).catch(
      (err) => {
        throw err;
      }
    );
    // アクセストークンのデコード
    const userName = await verifyToken(accessToken)
      .then((decoded) => {
        if (typeof decoded !== "string" && "user" in decoded) {
          return decoded.user;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        throw err;
      });
    await logoutModel(userName);
    res.status(HTTP_STATUS_NO_CONTENT).json();
  } catch (err: unknown) {
    next(err);
    // TODO:エラーハンドリングの共通化
    // console.error(err);
    // const response: ResponseError = {
    //   error: {
    //     code: HTTP_STATUS_SERVER_ERROR,
    //     message: SERVER_ERROR,
    //   },
    // };
    // res.status(HTTP_STATUS_SERVER_ERROR).json(response);
  }
};
