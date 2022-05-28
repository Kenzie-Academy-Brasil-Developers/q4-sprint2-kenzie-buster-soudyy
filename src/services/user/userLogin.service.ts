import { IUserLogin } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRespository = AppDataSource.getRepository(User);

  const users = await userRespository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new AppError(404, "Account not found");
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new AppError(401, "Wrong email/password");
  }

  const token = jwt.sign({ email: email }, String(process.env.JWT_SECRET), {
    expiresIn: "1d",
  });
  return token;
};

export default userLoginService;
