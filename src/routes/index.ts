import Express from "express";

import authRouter from "./authRouter";
import userRouter from "./userRouter";
import healthCheckRouter from "./healthCheckRouter";

import URI from "../constants/URI";

const router = Express.Router();

router.use(URI.PREFIX.AUTH, authRouter);
router.use(URI.PREFIX.USER, userRouter);
router.use(URI.PREFIX.HEALTH_CHECK, healthCheckRouter);

export default router;
