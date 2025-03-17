import { Router } from "express";
import homeController from "./controllers/homeController.js";
import jobApplicantsController from "./controllers/jobApplicantsController.js";

const routes = Router();

routes.use(homeController);
routes.use(jobApplicantsController);

export default routes;
