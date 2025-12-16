import express from 'express';
import { register, login, logout, me } from '../controllers/authenticationController.js';
import { authMiddleware, requireAuth } from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, requireAuth, me);

export default router;
