import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { consumeQueue } from "../queues/photoQueue.js";

const prisma = new PrismaClient();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

const processPhoto = async ({ id_photo, path: filename }) => {
  try {
    console.log("Processing photo:", filename);

    const oldPath = path.join(UPLOAD_DIR, filename);
    const newPath = path.join(UPLOAD_DIR, "processed_" + filename);

    if (fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath);

    await prisma.photo.update({
      where: { id_photo },
      data: { path: "processed_" + filename, status: "done" },
    });

    console.log("Photo processed:", filename);
  } catch (err) {
    console.error("Error processing photo:", err);
  }
};

consumeQueue(processPhoto);
