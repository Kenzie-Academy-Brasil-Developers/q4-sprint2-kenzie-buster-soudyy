import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/appError";
import userLoginService from "../../services/user/userLogin.service";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const token = await userLoginService({ email, password });

    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userLoginController;
