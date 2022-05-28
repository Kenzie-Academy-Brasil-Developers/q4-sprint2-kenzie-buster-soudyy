import { Router } from "express";
import cartController from "../controllers/cart/cart.controller";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", cartController);

  return routes;
};
