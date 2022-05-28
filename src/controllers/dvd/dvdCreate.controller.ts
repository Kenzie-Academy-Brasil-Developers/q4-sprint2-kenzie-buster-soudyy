import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/appError";
import dvdCreateService from "../../services/dvd/dvdCreate.service";

const dvdCreateController = async (req: Request, res: Response) => {
  try {
    const { name, duration, price, quantity } = req.body;

    const dvd = await dvdCreateService({ name, duration, price, quantity });

    return res.status(201).send(dvd);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdCreateController;
