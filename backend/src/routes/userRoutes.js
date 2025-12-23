import express from "express";
import { getMyAccount, getAllUsers, deleteUser } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get currently authenticated user's account data
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user data
 *       401:
 *         description: Unauthorized
 */
router.get("/me", requireAuth, getMyAccount);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin access)
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 */
router.get("/", requireAuth, getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete("/:id", requireAuth, deleteUser);

export default router;
