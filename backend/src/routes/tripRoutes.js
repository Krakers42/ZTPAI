import express from "express";
import { getTrips, addTrip, editTrip, deleteTrip } from "../controllers/tripController.js";
import { authMiddleware, requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", requireAuth, getTrips);
router.post("/add", requireAuth, addTrip);
router.put("/edit/:id", requireAuth, editTrip);
router.delete("/delete/:id", requireAuth, deleteTrip);

export default router;
