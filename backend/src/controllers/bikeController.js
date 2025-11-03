const bikes = [
  { id: 1, brand: "Trek", model: "Marlin 7", year: 2022 },
  { id: 2, brand: "Specialized", model: "Rockhopper", year: 2023 },
];

export const getAllBikes = (req, res) => {
  res.json(bikes);
};

export const getBikeById = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid bike ID" });
  }

  const bike = bikes.find(b => b.id === Number(id));

  if (!bike) {
    return res.status(404).json({ error: "Bike not found!" });
  }

  res.json(bike);
};
