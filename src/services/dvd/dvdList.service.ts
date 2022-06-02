import { AppDataSource } from "../../data-source";
import { Dvds } from "../../entities/dvd.entity";

const dvdListService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvds);

  const dvdList = await dvdRepository.find();

  return dvdList;
};

export default dvdListService;
