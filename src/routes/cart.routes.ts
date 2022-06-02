import { Router } from "express";
import cartController from "../controllers/cart/cart.controller";
import isAdmAuth from "../middlewares/isAdm.middleware";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", isAdmAuth, cartController);

  return routes;
};
