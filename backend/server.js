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

app.get("/api/bikes/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Nieprawidłowe ID roweru" });
  }

  const bike = bikes.find(b => b.id === id);
  if (!bike) {
    return res.status(404).json({ error: "Rower nie znaleziony" });
  }

  res.json(bike);
});

app.listen(PORT, () => {
  console.log(`Backend działa na porcie ${PORT}`);
});
