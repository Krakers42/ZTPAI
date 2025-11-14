import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import BikesLayout from "../components/layouts/PageLayout.jsx";
import useBikesStyles from "../styles/BikesStyles.js";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);
  const styles = useBikesStyles();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/bikes`).then((res) => {
      setBikes(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this bike?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bikes/${id}`);
      setBikes(bikes.filter((b) => b.id_bike_card !== id));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <BikesLayout />
      <main style={styles.main}>
        <Typography variant="h4" align="center" gutterBottom>
          BIKES
        </Typography>

        <Grid container spacing={3}>
          {bikes.length ? (
            bikes.map((bike) => (
              <Grid item xs={12} md={6} lg={4} key={bike.id_bike_card}>
                <Card sx={styles.card}>
                  {bike.photo_path && (
                    <CardMedia
                      component="img"
                      sx={styles.cardMedia}
                      image={`${import.meta.env.VITE_API_URL}/uploads/${bike.photo_path}`}
                      alt={bike.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{bike.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
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
              </Grid>
            ))
          ) : (
            <Typography sx={styles.noBikesText}>NO BIKES AVAILABLE</Typography>
          )}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={styles.addButton}
          onClick={() => (window.location.href = "/add-bike")}
        >
          Add Bike
        </Button>
      </main>
    </div>
  );
}
