import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { HTTP_STATUS_UNAUTHORIZED } from "../constants/HTTPStatus";
import { AUTH_TOKEN_TYPE, JWT_SECRET_KEY } from "../config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === AUTH_TOKEN_TYPE
  ) {
    // Authorizationヘッダーからトークンの値を抽出
    const token = req.headers.authorization.split(" ")[1];
    // JWTトークンの検証
    jwt.verify(token, JWT_SECRET_KEY, (err) => {
      if (err) {
        res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  } else {
    res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};
