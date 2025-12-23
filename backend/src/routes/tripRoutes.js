import express from "express";
import { getTrips, addTrip, editTrip, deleteTrip } from "../controllers/tripController.js";
import { requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips for authenticated user
 *     tags:
 *       - Trips
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of trips
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireAuth, getTrips);

/**
 * @swagger
 * /api/trips/add:
 *   post:
 *     summary: Add a new trip
 *     tags:
 *       - Trips
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Weekend ride
 *               description:
 *                 type: string
 *                 example: Trip to the mountains
 *     responses:
 *       201:
 *         description: Trip successfully added
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post("/add", requireAuth, addTrip);

/**
 * @swagger
 * /api/trips/edit/{id}:
 *   put:
 *     summary: Edit trip by ID
 *     tags:
 *       - Trips
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Weekend ride updated
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Trip successfully updated
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 */
router.put("/edit/:id", requireAuth, editTrip);

/**
 * @swagger
 * /api/trips/delete/{id}:
 *   delete:
 *     summary: Delete trip by ID
 *     tags:
 *       - Trips
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 */
router.delete("/delete/:id", requireAuth, deleteTrip);

export default router;
