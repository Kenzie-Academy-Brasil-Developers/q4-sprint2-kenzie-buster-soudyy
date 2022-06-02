import { AppDataSource } from "../../data-source";
import { IDvdcreate } from "../../interfaces/dvd";
import { Dvds } from "../../entities/dvd.entity";
import { Stock } from "../../entities/stock.entity";

const dvdCreateService = async ({
  name,
  duration,
  price,
  quantity,
}: IDvdcreate) => {
  const dvdRepository = AppDataSource.getRepository(Dvds);
  const stockRepository = AppDataSource.getRepository(Stock);

  const dvd = new Dvds();
  dvd.name = name;
  dvd.duration = duration;

  const stock = new Stock();
  stock.price = price;
  stock.quantity = quantity;

  stockRepository.create(stock);
  await stockRepository.save(stock);

  dvd.stock = stock;

  dvdRepository.create(dvd);
  await dvdRepository.save(dvd);
  return { dvds: [dvd] };
};

export default dvdCreateService;
