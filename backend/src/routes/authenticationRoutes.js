import express from 'express';
import { register, login, logout, me } from '../controllers/authenticationController.js';
import { authMiddleware, requireAuth } from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dariusz
 *               surname:
 *                 type: string
 *                 example: Krakowski
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Successful login
 *       404:
 *         description: User not found
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get currently authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user data
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware, requireAuth, me);

export default router;
