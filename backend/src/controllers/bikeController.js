import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const getBikes = async (req, res) => {
  try {
    const bikes = await prisma.bikeCard.findMany({
      where: { id_user: req.user.id_user },
      orderBy: { id_bike_card: "desc" },
    });
    res.json(bikes);
  } catch (err) {
    console.error("Error in getBikes:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addBike = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageFilename = req.file ? (req.file.filename || req.file.originalname) : null;

    const bike = await prisma.bikeCard.create({
      data: {
        id_user: req.user.id_user,
        name,
        description,
        image_type: req.file ? (req.file.mimetype ?? "jpg") : "none",
        photo_path: imageFilename,
      },
    });

    res.json(bike);
  
  } catch (err) {
    console.error("Error in addBike:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteBike = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const { id } = req.params;

    const bike = await prisma.bikeCard.findFirst({
      where: {
        id_bike_card: parseInt(id),
        id_user: userId,
      },
    });

    if (!bike) {
      return res.status(404).json({ error: "Bike not found or not owned by user" });
    }

    if (bike.photo_path) {
      const filePath = path.join(UPLOAD_DIR, bike.photo_path);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fsErr) {
        console.error("Failed to remove bike image file:", fsErr);
      }
    }

    await prisma.bikeCard.delete({
      where: { id_bike_card: bike.id_bike_card },
    });

    res.json({ message: "Bike deleted" });
  } catch (err) {
    console.error("Error in deleteBike:", err);
    res.status(500).json({ error: err.message });
  }
};
