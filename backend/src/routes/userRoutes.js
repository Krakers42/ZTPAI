import express from "express";
import { getMyAccount, getAllUsers, deleteUser } from "../controllers/userController.js";
import { authMiddleware, requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", requireAuth, getMyAccount);
router.get("/", requireAuth, getAllUsers);
router.delete("/:id", requireAuth, deleteUser);

export default router;
