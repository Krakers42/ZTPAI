import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
    const image = req.file ? req.file.filename : null;

    const bike = await prisma.bikeCard.create({
      data: {
        id_user: req.user.id_user,
        name,
        description,
        image_type: image ? "jpg" : "none",
        photo_path: image,
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
    const { id } = req.params;
    await prisma.bikeCard.deleteMany({
      where: {
        id_bike_card: parseInt(id),
        id_user: req.user.id_user,
      },
    });
    res.json({ message: "Bike deleted" });
  } catch (err) {
    console.error("Error in deleteBike:", err);
    res.status(500).json({ error: err.message });
  }
};
