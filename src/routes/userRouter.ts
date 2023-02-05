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
      // TODO:usernameの重複エラーが検出出来ていない
      await createUserHandler(req.body);
      res.status(HTTP_STATUS.CREATED).json();
    } catch (err) {
      // TODO:エラーハンドリングの共通化
      res.status(HTTP_STATUS.SERVER_ERROR).json({ message: err });
    }
  }
);

export default router;
