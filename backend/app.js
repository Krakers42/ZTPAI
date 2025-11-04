import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import authRoutes from './src/routes/authenticationRoutes.js';
import bikeRoutes from "./src/routes/bikeRoutes.js";

import { authMiddleware } from './src/middlewares/authenticationMiddleware.js';

import { errorHandler, notFoundHandler } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true}));
app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/bikes", authMiddleware, bikeRoutes); //authMiddleware - bikes are only accesible for logged users

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
