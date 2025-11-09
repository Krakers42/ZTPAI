import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const longestRide = await prisma.trip.aggregate({
      _max: { distance: true },
      where: { id_user: userId },
    });

    const tripCount = await prisma.trip.count({
      where: { id_user: userId },
    });

    const totalDistance = await prisma.trip.aggregate({
      _sum: { distance: true },
      where: { id_user: userId },
    });

    const photoCount = await prisma.photo.count({
      where: { id_user: userId },
    });

    const maxElevation = await prisma.trip.aggregate({
      _max: { elevation: true },
      where: { id_user: userId },
    });

    res.json({
      longestRide: longestRide._max.distance || 0,
      tripCount: tripCount || 0,
      totalDistance: totalDistance._sum.distance || 0,
      photoCount: photoCount || 0,
      maxElevation: maxElevation._max.elevation || 0,
    });
  } catch (err) {
    console.error("Error in downloading data:", err);
    res.status(500).json({ error: err.message });
  }
};
