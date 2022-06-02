import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { User } from "../../entities/user.entity";
import { notStock } from "../../utils";

const cartService = async (userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const user = await userRepository.findOne({ where: { email: userEmail } });
  const cart = await cartRepository.findOne({ where: { newUser: user } });

  cart.paid = true;
  await cartRepository.save(cart);

  return cart;
};

export default cartService;
