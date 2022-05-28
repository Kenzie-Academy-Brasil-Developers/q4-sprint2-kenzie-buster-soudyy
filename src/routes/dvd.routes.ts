import { Router } from "express";
// import dvdBuyController from "../controllers/dvd/dvdBuy.controller";
import dvdCreateController from "../controllers/dvd/dvdCreate.controller";
import dvdListController from "../controllers/dvd/dvdList.controller";

const routes = Router();

export const dvdRoutes = () => {
  routes.post("/register", dvdCreateController);
  // routes.post("/buy/:dvdid", dvdBuyController);
  routes.get("", dvdListController);

  return routes;
};
