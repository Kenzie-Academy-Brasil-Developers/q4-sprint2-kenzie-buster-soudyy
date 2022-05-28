import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserCreate } from "../../interfaces/user";
import bcrypt from "bcrypt";
import userWOPassword from "../../utils";
const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserCreate) => {
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
  // const cartRespository = AppDataSource.getRepository(Cart);

  const users = await userRespository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(409, `Key (email)=(${email}) already exists.`);
  }

  // const cart = new Cart();
  // cart.total = 0;

  // cartRespository.create(cart);
  // await cartRespository.save(cart);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await bcrypt.hash(password, 10);
  isAdm ? (user.isAdm = isAdm) : false;

  const userWOP = userWOPassword(user);

  userRespository.create(user);
  await userRespository.save(user);
  return userWOP;
};

export default userCreateService;
