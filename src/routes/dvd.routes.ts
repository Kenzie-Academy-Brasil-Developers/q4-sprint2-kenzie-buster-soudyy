import { Router } from "express";
import dvdBuyController from "../controllers/dvd/dvdBuy.controller";
import dvdCreateController from "../controllers/dvd/dvdCreate.controller";
import dvdListController from "../controllers/dvd/dvdList.controller";
import isAdmAuth from "../middlewares/isAdm.middleware";

const routes = Router();

export const dvdRoutes = () => {
  routes.post("/register", isAdmAuth, dvdCreateController);
  routes.post("/buy/:dvdid", isAdmAuth, dvdBuyController);
  routes.get("", isAdmAuth, dvdListController);

  return routes;
};
