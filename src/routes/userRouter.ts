import Express from "express";

import { createUserHandler } from "../handler/userHandler";

import URI from "../constants/URI";
import HTTP_STATUS from "../constants/httpStatus";

const router = Express.Router();

// ユーザー取得API
router.get(
  URI.USER.GET_ONE,
  (req: Express.Request, res: Express.Response): void => {
    res.status(HTTP_STATUS.OK).json({ id: req.params.userId });
  }
);

// ユーザー作成API
router.post(
  URI.USER.CREATE,
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    try {
      await createUserHandler(req.body);
      res.status(HTTP_STATUS.CREATED).json();
    } catch (err: unknown) {
      // TODO:エラーハンドリングとエラーメッセージの共通化
      if (err instanceof Error) {
        const response = {
          code: HTTP_STATUS.SERVER_ERROR,
          message: err.message,
        };
        res.status(HTTP_STATUS.SERVER_ERROR).json(response);
      }
    }
  }
);

export default router;
