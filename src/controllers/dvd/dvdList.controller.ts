import { Response, Request } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IDvd } from "../../interfaces/dvd";
import dvdListService from "../../services/dvd/dvdList.service";

const dvdListController = async (req: Request, res: Response) => {
  const dvdList: IDvd[] = await dvdListService();

  return res.json(dvdList);
};

export default dvdListController;
