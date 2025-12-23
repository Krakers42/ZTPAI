import express from "express";
import multer from "multer";
import {
  getPhotos,
  uploadPhoto,
  deletePhoto,
} from "../controllers/photoController.js";
import { requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Get all photos for authenticated user
 *     tags:
 *       - Photos
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of photos
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireAuth, getPhotos);

/**
 * @swagger
 * /api/photos/upload:
 *   post:
 *     summary: Upload a new photo
 *     tags:
 *       - Photos
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo successfully uploaded
 *       400:
 *         description: Invalid file or request data
 *       401:
 *         description: Unauthorized
 */
router.post("/upload", requireAuth, upload.single("image"), uploadPhoto);

/**
 * @swagger
 * /api/photos/{id}:
 *   delete:
 *     summary: Delete photo by ID
 *     tags:
 *       - Photos
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Photo ID
 *     responses:
 *       200:
 *         description: Photo successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Photo not found
 */
router.delete("/:id", requireAuth, deletePhoto);

export default router;
