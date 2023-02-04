import Express from "express";

import { authMiddleware } from "../middleware/authMiddleware";
import { LoginHandler } from "../handler/authHandler";
import { HTTP_STATUS_OK } from "../config/constants";

const router = Express.Router();

// ログインAPI
router.post("/login", (req: Express.Request, res: Express.Response): void => {
  const response = LoginHandler(req.body);
  res.status(HTTP_STATUS_OK).json(response);
});

// 要認証API
router.get(
  "/hello",
  authMiddleware,
  (req: Express.Request, res: Express.Response): void => {
    const response = {
      message: "Hello After Authentication World!!",
    };
    res.status(HTTP_STATUS_OK).json(response);
  }
);

// ログアウトAPI
router.post("/logout", (req: Express.Request, res: Express.Response): void => {
  res.status(201).json({ message: "Nothing Process" });
});

export default router;
