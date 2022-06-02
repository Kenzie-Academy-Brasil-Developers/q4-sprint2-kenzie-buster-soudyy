import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/appError";
import cartService from "../../services/cart/cart.service";

const cartController = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req;
    const cart = await cartService(userEmail);
    return res.status(200).json({ cart: [cart] });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default cartController;
