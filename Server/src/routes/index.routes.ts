import express from "express";
import { appRoutes } from "./app.routes";

const routing = {
  APP: "/v1/app",
};
const routes = express();

routes.use(routing.APP, appRoutes);

export default routes;
