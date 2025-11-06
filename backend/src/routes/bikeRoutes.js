import express from "express";
import multer from "multer";
import path from "path";
import { addBike, getBikes, deleteBike } from "../controllers/bikeController.js";
import { authMiddleware, requireAuth } from "../middlewares/authenticationMiddleware.js";

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

router.use(authMiddleware);

router.get("/", requireAuth, getBikes);
router.post("/add", requireAuth, upload.single("image"), addBike);
router.delete("/:id", requireAuth, deleteBike);

export default router;