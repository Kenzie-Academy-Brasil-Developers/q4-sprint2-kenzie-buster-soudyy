import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/appError";
import dvdBuyService from "../../services/dvd/dvdBuy.service";

const dvdBuyController = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const { dvdid } = req.params;
    const { userEmail } = req;

    const buy = await dvdBuyService(quantity, dvdid, userEmail);

    return res.status(201).json(buy);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdBuyController;
