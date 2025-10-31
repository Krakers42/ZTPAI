import express from "express";
import { getAllBikes, getBikeById } from "../controllers/bikeController.js";

const router = express.Router();

router.get("/", getAllBikes);
router.get("/:id", getBikeById);

export default router;

