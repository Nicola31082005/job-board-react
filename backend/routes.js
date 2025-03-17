import { Router } from "express";
import homeController from "./controllers/homeController.js";
import jobApplicantsController from "./controllers/jobApplicantsController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use(homeController);
routes.use(jobApplicantsController);
routes.use(userController);

export default routes;
