import express from "express";
import cors from "cors";
import bikeRoutes from "./src/routes/bikeRoutes.js";
import { errorHandler, notFoundHandler } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/bikes", bikeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
