import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const isAdmAuth = (req: Request, res: Response, next: NextFunction) => {
  //   if (!req.decoded.isAdm) {
  //     throw new AppError(401, "Permission denied");
  //   }

  return next();
};
export default isAdmAuth;
