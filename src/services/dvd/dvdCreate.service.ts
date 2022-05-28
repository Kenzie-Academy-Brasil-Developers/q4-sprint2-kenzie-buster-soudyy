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
  dvd.stock.price = price;
  dvd.stock.quantity = quantity;

  dvdRepository.create(dvd);
  await dvdRepository.save(dvd);

  return dvd.stock;
};

export default dvdCreateService;
