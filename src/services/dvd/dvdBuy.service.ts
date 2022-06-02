import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { Dvds } from "../../entities/dvd.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { userOrderOff, userWOPassword } from "../../utils";

const dvdBuyService = async (
  qtd: number,
  itemId: string,
  userEmail: string
) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const userRepository = AppDataSource.getRepository(User);
  const dvdRepository = AppDataSource.getRepository(Dvds);

  const dvd = await dvdRepository.findOne({ where: { id: itemId } });
  const user = await userRepository.findOne({ where: { email: userEmail } });

  if (!dvd) {
    throw new AppError(404, "dvd not found");
  }
  if (dvd.stock.quantity < qtd) {
    throw new AppError(
      422,
      `"current stock: ${dvd.stock.quantity}, received demand 400"`
    );
  }
  const userWOP = userOrderOff(userWOPassword(user));

  const cart = new Cart();
  cart.paid = false;
  cart.total = dvd.stock.price * qtd;
  cart.newUser = userWOP;
  cart.dvd = [dvd];

  cartRepository.create(cart);
  await cartRepository.save(cart);

  return cart;
};

export default dvdBuyService;
