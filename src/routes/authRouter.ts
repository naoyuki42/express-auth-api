import Express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { LoginHandler } from "../handler/authHandler";

import URI from "../constants/URI";
import HTTP_STATUS from "../constants/httpStatus";

const router = Express.Router();

// ログインAPI
router.post(
  URI.AUTH.LOGIN,
  (req: Express.Request, res: Express.Response): void => {
    const response = LoginHandler(req.body);
    res.status(HTTP_STATUS.OK).json(response);
  }
);

// 要認証API
router.get(
  URI.AUTH.HELLO,
  authMiddleware,
  (req: Express.Request, res: Express.Response): void => {
    const response = {
      message: "Hello After Authentication World!!",
    };
    res.status(HTTP_STATUS.OK).json(response);
  }
);

// ログアウトAPI
router.post(
  URI.AUTH.LOGOUT,
  (req: Express.Request, res: Express.Response): void => {
    res.status(201).json({ message: "Nothing Process" });
  }
);

export default router;
