import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const getPhotos = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const photos = await prisma.photo.findMany({
      where: { id_user: userId },
      orderBy: { id_photo: "desc" },
    });

    const formatted = photos.map(p => ({
      ...p,
      created_at: p.created_at ? new Date(p.created_at).toISOString() : new Date().toISOString(),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    const userId = req.user.id_user;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filename = `${Date.now()}_${req.file.originalname}`;
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), req.file.buffer);

    const photo = await prisma.photo.create({
      data: {
        id_user: userId,
        path: filename,
      },
    });

    const photoWithDate = {
      ...photo,
      created_at: photo.created_at ? new Date(photo.created_at).toISOString() : new Date().toISOString(),
    };

    res.json({ success: true, photo: photoWithDate });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload photo" });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const { id } = req.params;

    const photo = await prisma.photo.findFirst({
      where: { id_photo: parseInt(id), id_user: userId },
    });

    if (!photo) return res.status(404).json({ error: "Photo not found" });

    const filepath = path.join(UPLOAD_DIR, photo.path);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    await prisma.photo.delete({ where: { id_photo: parseInt(id) } });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete photo" });
  }
};
