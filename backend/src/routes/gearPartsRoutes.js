import express from "express";
import { getGearParts, addGearPart, editGearPart, deleteGearPart } from "../controllers/gearPartsController.js";
import { authMiddleware, requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", requireAuth, getGearParts);
router.post("/add", requireAuth, addGearPart);
router.put("/edit/:id", requireAuth, editGearPart);
router.delete("/delete/:id", requireAuth, deleteGearPart);

export default router;
