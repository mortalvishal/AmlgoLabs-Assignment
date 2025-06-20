import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controller/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", protect, getDashboardData);

export default dashboardRouter;
