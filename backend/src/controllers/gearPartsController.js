import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getGearParts = async (req, res) => {
  try {
    const gearParts = await prisma.gearPart.findMany({
      where: { id_user: req.user.id_user },
      orderBy: { id_gear_part: "asc" },
    });
    res.json(gearParts);
  } catch (err) {
    console.error("Error in getGearParts:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addGearPart = async (req, res) => {
  try {
    const { purchase_date, name, value, comment } = req.body;
    const newPart = await prisma.gearPart.create({
      data: {
        id_user: req.user.id_user,
        purchase_date: purchase_date ? new Date(purchase_date) : null,
        name,
        value: value ? parseInt(value) : null,
        comment,
      },
    });
    res.status(201).json(newPart);
  } catch (err) {
    console.error("Error in addGearPart:", err);
    res.status(500).json({ error: err.message });
  }
};

export const editGearPart = async (req, res) => {
  try {
    const { id } = req.params;
    const { purchase_date, name, value, comment } = req.body;
    const updatedPart = await prisma.gearPart.update({
      where: { id_gear_part: parseInt(id) },
      data: {
        purchase_date: purchase_date ? new Date(purchase_date) : null,
        name,
        value: value ? parseInt(value) : null,
        comment,
      },
    });
    res.json(updatedPart);
  } catch (err) {
    console.error("Error in editGearPart:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteGearPart = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.gearPart.deleteMany({
      where: { id_gear_part: parseInt(id), id_user: req.user.id_user },
    });
    res.json({ message: "Gear part deleted" });
  } catch (err) {
    console.error("Error in deleteGearPart:", err);
    res.status(500).json({ error: err.message });
  }
};
