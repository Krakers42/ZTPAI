import express from "express";
import multer from "multer";
import { getPhotos, uploadPhoto, deletePhoto } from "../controllers/PhotoController.js";
import { authMiddleware, requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.get("/", requireAuth, getPhotos);
router.post("/upload", requireAuth, upload.single("image"), uploadPhoto);
router.delete("/:id", requireAuth, deletePhoto);

export default router;
