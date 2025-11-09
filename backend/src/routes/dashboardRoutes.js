import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { authMiddleware, requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", requireAuth, getDashboardData);

export default router;
