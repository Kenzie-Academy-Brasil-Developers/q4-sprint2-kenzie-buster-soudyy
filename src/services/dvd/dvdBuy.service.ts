// import { AppDataSource } from "../../data-source";
// import { Buy } from "../../entities/buy.entity";
// import { Cart } from "../../entities/cart.entity";
// import { Dvds } from "../../entities/dvd.entity";
// import { User } from "../../entities/user.entity";
// import { AppError } from "../../errors/appError";

// const dvdBuyService = async (item: string) => {
//   const cartRespository = AppDataSource.getRepository(Cart);
//   const userRespository = AppDataSource.getRepository(User);
//   const buyRespository = AppDataSource.getRepository(Buy);

//   const user = await userRespository.findOne({
//     where: {
//       email: item,
//     },
//   });
//   const cart = await cartRespository.findOne({
//     where: {
//       id: user?.cart.id,
//     },
//   });

//   if (cart && user) {
//     if (cart.dvds.length === 0) {
//       throw new AppError(400, "Cart is empty");
//     }

//     const buy = new Buy();
//     buy.user = user;
//     buy.products = cart.dvds;
//     buy.total = cart.total;

//     buyRespository.create(buy);
//     await buyRespository.save(buy);

//     cart.dvds = [];
//     cart.total = 0;
//     await cartRespository.save(cart);

//     const newBuy = buyRespository.find({
//       where: {
//         id: buy.id,
//       },
//     });

//     return newBuy;
//   }
// };

// export default dvdBuyService;
