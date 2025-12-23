import express from "express";
import multer from "multer";
import path from "path";
import { addBike, getBikes, deleteBike } from "../controllers/bikeController.js";
import { requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/**
 * @swagger
 * /api/bikes:
 *   get:
 *     summary: Get all bikes for authenticated user
 *     tags:
 *       - Bikes
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of bikes
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireAuth, getBikes);

/**
 * @swagger
 * /api/bikes/add:
 *   post:
 *     summary: Add a new bike
 *     tags:
 *       - Bikes
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Trek X-Caliber 8
 *               description:
 *                 type: string
 *                 example: Mountain bike for trail riding
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Bike successfully added
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post("/add", requireAuth, upload.single("image"), addBike);

/**
 * @swagger
 * /api/bikes/{id}:
 *   delete:
 *     summary: Delete bike by ID
 *     tags:
 *       - Bikes
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bike ID
 *     responses:
 *       200:
 *         description: Bike successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bike not found
 */
router.delete("/:id", requireAuth, deleteBike);

export default router;