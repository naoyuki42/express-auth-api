import Express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { getUserHandler, createUserHandler } from "../handler/userHandler";

import URI from "../constants/URI";
import HTTP_STATUS from "../constants/httpStatus";

import { ErrorResponse } from "../types/response/error";

const router = Express.Router();

// ユーザー取得API
router.get(
  URI.USER.GET_ONE,
  authMiddleware,
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    try {
      const response = await getUserHandler(Number(req.params.userId));
      res.status(HTTP_STATUS.OK).json(response);
    } catch (err: unknown) {
      // TODO:エラーハンドリングの共通化
      if (err instanceof Error) {
        const response: ErrorResponse = {
          code: HTTP_STATUS.SERVER_ERROR,
          message: err.message,
        };
        res.status(HTTP_STATUS.SERVER_ERROR).json(response);
      }
    }
  }
);

// ユーザー作成API
router.post(
  URI.USER.CREATE,
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    try {
      const response = await createUserHandler(req.body);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (err: unknown) {
      // TODO:エラーハンドリングの共通化
      if (err instanceof Error) {
        const response: ErrorResponse = {
          code: HTTP_STATUS.SERVER_ERROR,
          message: err.message,
        };
        res.status(HTTP_STATUS.SERVER_ERROR).json(response);
      }
    }
  }
);

export default router;
