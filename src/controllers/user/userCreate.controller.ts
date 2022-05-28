import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/appError";
import userCreateService from "../../services/user/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, isAdm } = req.body;

    const user = await userCreateService({ email, name, password, isAdm });

    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userCreateController;
