import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMyAccount = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const user = await prisma.user.findUnique({
      where: { id_user: userId },
      include: {
        user_details: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id_user: user.id_user,
      email: user.email,
      name: user.user_details?.name,
      surname: user.user_details?.surname,
      role: user.user_details?.role,
    });
  } catch (err) {
    console.error("Error in getMyAccount:", err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "admin")
      return res.status(403).json({ error: "Access denied" });

    const users = await prisma.user.findMany({
      include: { user_details: true },
      orderBy: { id_user: "asc" },
    });

    const formatted = users.map((u) => ({
      id_user: u.id_user,
      email: u.email,
      name: u.user_details?.name,
      surname: u.user_details?.surname,
      role: u.user_details?.role,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const userRole = req.user.role;
    const { id } = req.params;

    const targetId = parseInt(id);
    if (userRole !== "admin" && userId !== targetId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.user.delete({
      where: { id_user: targetId },
    });

    if (userId === targetId) {
      res.json({ success: true, logout: true });
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    console.error("Error in deleteUser:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
