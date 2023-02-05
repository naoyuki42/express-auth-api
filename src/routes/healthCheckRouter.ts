import Express from "express";

import URI from "../constants/URI";
import HTTP_STATUS from "../constants/httpStatus";

const router = Express.Router();

// ヘルスチェック用API
router.get(
  URI.HEALTH_CHECK.OK,
  (req: Express.Request, res: Express.Response): void => {
    res.status(HTTP_STATUS.OK).json({ health: "OK" });
  }
);

export default router;
