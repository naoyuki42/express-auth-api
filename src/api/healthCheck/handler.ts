import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS_OK } from "../../constants/HTTPStatus";
import { HEALTH_CHECK_OK } from "../../constants/Message";
import { ResponseHealthCheck } from "../../types/response";

export const healthCheckHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response: ResponseHealthCheck = { health: HEALTH_CHECK_OK };
    res.status(HTTP_STATUS_OK).json(response);
  } catch (err: unknown) {
    next(err);
  }
};
