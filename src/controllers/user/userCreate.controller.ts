import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/appError";
import userCreateService from "../../services/user/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, isAdm } = req.body;
    const { userEmail } = req;
    const user = await userCreateService(
      {
        email,
        name,
        password,
        isAdm,
      },
      userEmail
    );

    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res);
    }
  }
};

export default userCreateController;
