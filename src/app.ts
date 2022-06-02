import { appRoutes } from "./routes";
import { AppError } from "./errors/appError";
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());

appRoutes(app);
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }
  console.log(err);
  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

export default app;
