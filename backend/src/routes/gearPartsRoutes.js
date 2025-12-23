import express from "express";
import {
  getGearParts,
  addGearPart,
  editGearPart,
  deleteGearPart,
} from "../controllers/gearPartsController.js";
import { requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/gear-parts:
 *   get:
 *     summary: Get all gear and parts for authenticated user
 *     tags:
 *       - Gear&Parts
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of gear and parts
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireAuth, getGearParts);

/**
 * @swagger
 * /api/gear-parts/add:
 *   post:
 *     summary: Add a new gear or part
 *     tags:
 *       - Gear&Parts
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
 *                 example: Chain Shimano XT
 *               description:
 *                 type: string
 *                 example: 12-speed MTB chain
 *     responses:
 *       201:
 *         description: Gear or part successfully added
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post("/add", requireAuth, addGearPart);

/**
 * @swagger
 * /api/gear-parts/edit/{id}:
 *   put:
 *     summary: Edit gear or part by ID
 *     tags:
 *       - Gear&Parts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gear or part ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chain Shimano SLX
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Gear or part successfully updated
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Gear or part not found
 */
router.put("/edit/:id", requireAuth, editGearPart);

/**
 * @swagger
 * /api/gear-parts/delete/{id}:
 *   delete:
 *     summary: Delete gear or part by ID
 *     tags:
 *       - Gear&Parts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gear or part ID
 *     responses:
 *       200:
 *         description: Gear or part successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Gear or part not found
 */
router.delete("/delete/:id", requireAuth, deleteGearPart);

export default router;
