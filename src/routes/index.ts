import Express from "express";
import authRouter from "./authRouter";
import healthCheckRouter from "./healthCheckRouter";

const router = Express.Router();

router.use("/health", healthCheckRouter);
router.use("/auth", authRouter);

export default router;
