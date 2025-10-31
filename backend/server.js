import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const bikes = [
  { id: 1, brand: "Trek", model: "Marlin 7", year: 2022 },
  { id: 2, brand: "Specialized", model: "Rockhopper", year: 2023 }
];

app.get("/api/hello", (req, res) => {
  res.json({ message: "Połączenie z backendem działa poprawnie!" });
});

app.get("/api/bikes", (req, res) => {
  res.json(bikes);
});

app.get("/api/bikes/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid bike ID" });
  }

  const bike = await prisma.bike.findUnique({ where: { id: Number(id) } });
  if (!bike) {
    return res.status(404).json({ error: "Bike not found" });
  }

  res.json(bike);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((req, res) => {
  res.status(400).json({ error: "Invalid ID" });
});

app.listen(PORT, () => {
  console.log(`Backend działa na porcie ${PORT}`);
});
