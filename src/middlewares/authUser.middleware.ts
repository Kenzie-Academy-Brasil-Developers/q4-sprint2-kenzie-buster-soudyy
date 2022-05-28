import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { AppError, handleError } from "../errors/appError";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(400, "Missing authorization token.");
  }

  return jwt.verify(token, "JWT_SECRET", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token." });
    }
    // req.decoded = decoded as User;
    return next();
  });
};

export default authUser;
