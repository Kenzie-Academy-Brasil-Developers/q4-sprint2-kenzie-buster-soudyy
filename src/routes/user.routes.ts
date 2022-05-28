import { Router } from "express";
// import { authUser } from "../middlewares/authUser.middleware";
// import { isAdmAuth } from "../middlewares/isAdm.middleware";

import userCreateController from "../controllers/user/userCreate.controller";
import userLoginController from "../controllers/user/userLogin.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", userCreateController);
  routes.post("/login", userLoginController);

  return routes;
};
