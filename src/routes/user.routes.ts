import { Router } from "express";
import { isAdmAuth } from "../middlewares/isAdm.middleware";

import userCreateController from "../controllers/user/userCreate.controller";
import userLoginController from "../controllers/user/userLogin.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", isAdmAuth, userCreateController);
  routes.post("/login", userLoginController);

  return routes;
};
