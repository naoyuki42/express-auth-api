import Express from "express";
import jwt from "jsonwebtoken";

import { HTTP_STATUS_UNAUTHORIZED, JWT_SECRET_KEY } from "../constants";

export const authMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): void => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Authorizationヘッダーからトークンの値を抽出
    token = req.headers.authorization.split(" ")[1];
    // JWTトークンの検証
    jwt.verify(token, JWT_SECRET_KEY, (err) => {
      if (err) {
        res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: "Unauthorized" });
      }
    });
  } else {
    res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};
