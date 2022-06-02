import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import * as dotenv from "dotenv";

dotenv.config();

export const isAdmAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(400, "Missing authorization token.");
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token." });
    }
    req.decoded = decoded as User;
    req.userEmail = decoded.email;

    return next();
  });
};
export default isAdmAuth;
