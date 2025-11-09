import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import authRoutes from './src/routes/authenticationRoutes.js';
import bikeRoutes from "./src/routes/bikeRoutes.js";
import gearPartsRoutes from './src/routes/gearPartsRoutes.js';
import tripRoutes from './src/routes/tripRoutes.js'
import photoRoutes from "./src/routes/photoRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

import { authMiddleware } from './src/middlewares/authenticationMiddleware.js';

import { errorHandler, notFoundHandler } from "./src/middlewares/errorHandler.js";

import path from "path";
import { fileURLToPath } from "url";


const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true}
));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/bikes", bikeRoutes);
app.use("/api/gear_parts", gearPartsRoutes); 
app.use("/api/trips", tripRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
