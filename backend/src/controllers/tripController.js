import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { id_user: req.user.id_user },
      orderBy: { id_trip: "desc" },
    });
    res.json(trips);
  } catch (err) {
    console.error("Error in getTrips:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addTrip = async (req, res) => {
  try {
    const { date, time, distance, elevation, description } = req.body;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const newTrip = await prisma.trip.create({
      data: {
        id_user: req.user.id_user,
        date: new Date(date),
        time: time || null,
        distance: distance ? parseInt(distance) : 0,
        elevation: elevation ? parseInt(elevation) : null,
        description: description || null,
      },
    });

    res.status(201).json(newTrip);
  } catch (err) {
    console.error("Error in addTrip:", err);
    res.status(500).json({ error: err.message });
  }
};

export const editTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, distance, elevation, description } = req.body;

    const updated = await prisma.trip.updateMany({
      where: { id_trip: parseInt(id), id_user: req.user.id_user },
      data: {
        ...(date ? { date: new Date(date) } : {}),
        ...(time !== undefined ? { time: time || null } : {}),
        ...(distance !== undefined ? { distance: distance ? parseInt(distance) : 0 } : {}),
        ...(elevation !== undefined ? { elevation: elevation ? parseInt(elevation) : null } : {}),
        ...(description !== undefined ? { description: description || null } : {}),
      },
    });
    if (updated.count === 0) {
      return res.status(404).json({ error: "Trip not found or not owned by user" });
    }
    const trip = await prisma.trip.findUnique({
      where: { id_trip: parseInt(id) },
    });
    res.json(trip);
  } catch (err) {
    console.error("Error in editTrip:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.trip.deleteMany({
      where: { id_trip: parseInt(id), id_user: req.user.id_user },
    });
    if (deleted.count === 0) {
      return res.status(404).json({ error: "Trip not found or not owned by user" });
    }
    res.json({ message: "Trip deleted" });
  } catch (err) {
    console.error("Error in deleteTrip:", err);
    res.status(500).json({ error: err.message });
  }
};
