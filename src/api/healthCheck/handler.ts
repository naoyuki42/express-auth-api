import { Request, Response } from "express";

import { HTTP_STATUS_OK } from "../../constants/HTTPStatus";

export const healthCheckHandler = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS_OK).json({ health: "OK" });
};
