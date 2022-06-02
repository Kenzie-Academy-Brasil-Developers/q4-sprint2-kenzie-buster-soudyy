import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserCreate } from "../../interfaces/user";
import bcrypt from "bcrypt";
import { userWOPassword } from "../../utils";
const userCreateService = async (
  { name, email, password, isAdm }: IUserCreate,
  userEmail: string
) => {
  const missingData = [];
  if (!email) {
    missingData.push("email");
  }
  if (!name) {
    missingData.push("name");
  }
  if (!password) {
    missingData.push("password");
  }
  if (missingData.length > 0) {
    return missingData.map((el) => `${el} is a required field`);
  }

  const userRespository = AppDataSource.getRepository(User);

  const users = await userRespository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  const userAdm = await userRespository.findOne({
    where: { email: userEmail },
  });
  if (!userAdm.isAdm) {
    throw new AppError(401, "Permission denied");
  }
  if (emailAlreadyExists) {
    throw new AppError(409, `Key (email)=(${email}) already exists.`);
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await bcrypt.hash(password, 10);
  user.isAdm = isAdm ? (user.isAdm = isAdm) : false;

  const userWOP = userWOPassword(user);

  userRespository.create(user);
  await userRespository.save(user);
  return userWOP;
};

export default userCreateService;
