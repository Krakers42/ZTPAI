import express from "express";
import { getTrips, addTrip, editTrip, deleteTrip } from "../controllers/tripController.js";
import { requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getTrips);
router.post("/add", requireAuth, addTrip);
router.put("/edit/:id", requireAuth, editTrip);
router.delete("/delete/:id", requireAuth, deleteTrip);

export default router;
