import Express from "express";

import { HTTP_STATUS_OK } from "../config/constants";

const router = Express.Router();

// ヘルスチェック用API
router.get("", (req: Express.Request, res: Express.Response): void => {
  res.status(HTTP_STATUS_OK).json({ health: "OK" });
});

export default router;
