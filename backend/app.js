import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from './src/routes/authenticationRoutes.js';
import bikeRoutes from "./src/routes/bikeRoutes.js";
import gearPartsRoutes from './src/routes/gearPartsRoutes.js';
import tripRoutes from './src/routes/tripRoutes.js'
import photoRoutes from "./src/routes/photoRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

import { requireAuth, authMiddleware } from './src/middlewares/authenticationMiddleware.js';
import { errorHandler, notFoundHandler } from "./src/middlewares/errorHandler.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true}
));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(authMiddleware);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/dashboard", requireAuth, dashboardRoutes);
app.use("/api/bikes", requireAuth, bikeRoutes);
app.use("/api/gear_parts", requireAuth, gearPartsRoutes); 
app.use("/api/photos", requireAuth, photoRoutes);
app.use("/api/trips", requireAuth, tripRoutes);
app.use("/api/users", requireAuth, userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;