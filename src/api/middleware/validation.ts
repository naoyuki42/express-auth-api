import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { HTTP_STATUS_BAD_REQUEST } from "../../constants/HTTPStatus";
import { BAD_REQUEST } from "../../constants/Message";

import { ResponseTypeError } from "../../types/response";

export const validationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await validationResult(req).throw();
    next();
  } catch (err: unknown) {
    console.log(err);
    const response: ResponseTypeError = {
      error: {
        code: HTTP_STATUS_BAD_REQUEST,
        message: BAD_REQUEST,
      },
    };
    res.status(HTTP_STATUS_BAD_REQUEST).json(response);
  }
};
