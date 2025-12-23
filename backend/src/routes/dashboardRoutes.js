import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard data for authenticated user
 *     tags:
 *       - Dashboard
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireAuth, getDashboardData);

export default router;
