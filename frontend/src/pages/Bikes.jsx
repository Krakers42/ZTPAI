import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import BikesLayout from "../components/layouts/PageLayout.jsx";
import useBikesStyles from "../styles/BikesStyles.js";

import { getBikes, deleteBike } from "../services/bikesService.js";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);
  const styles = useBikesStyles();

  useEffect(() => {
    getBikes().then(setBikes);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this bike?")) {
      await deleteBike(id);
      setBikes((prev) => prev.filter((b) => b.id_bike_card !== id));
    }
  };

  return (
    <BikesLayout>
      <Typography variant="h4" align="center" sx={styles.title}>
        BIKES
      </Typography>

      <Box sx={styles.gridContainer}>
        {bikes.length ? (
          bikes.map((bike) => (
            <Card key={bike.id_bike_card} sx={styles.card}>
              {bike.photo_path && (
                <CardMedia
                  component="img"
                  sx={styles.cardMedia}
                  image={`${import.meta.env.VITE_API_URL}/uploads/${bike.photo_path}`}
                  alt={bike.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" align="center" >{bike.name}</Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  {bike.description}
                </Typography>
              </CardContent>
              <IconButton
                color="error"
                sx={styles.deleteButton}
                onClick={() => handleDelete(bike.id_bike_card)}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))
        ) : (
          <Typography sx={styles.noBikesText}>NO BIKES AVAILABLE</Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={styles.addButton}
        onClick={() => (window.location.href = "/add-bike")}
      >
        Add Bike
      </Button>
    </BikesLayout>
  );
}
