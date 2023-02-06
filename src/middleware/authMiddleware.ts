import Express from "express";
import jwt from "jsonwebtoken";

import Config from "../config/config";
import HTTP_STATUS from "../constants/httpStatus";

export const authMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): void => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === Config.AUTHORIZATION_TOKEN_TYPE
  ) {
    // Authorizationヘッダーからトークンの値を抽出
    const token = req.headers.authorization.split(" ")[1];
    // JWTトークンの検証
    jwt.verify(token, Config.JWT_SECRET_KEY, (err) => {
      if (err) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  } else {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};
