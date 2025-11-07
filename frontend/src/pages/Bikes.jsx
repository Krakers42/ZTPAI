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
import BikesLayout from "./PageLayout";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);

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
      <main style={{ flex: 1, padding: "30px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          BIKES
        </Typography>

        <Grid container spacing={3}>
          {bikes.length ? (
            bikes.map((bike) => (
              <Grid item xs={12} md={6} lg={4} key={bike.id_bike_card}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  {bike.photo_path && (
                    <CardMedia
                      component="img"
                      height="200"
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
                    onClick={() => handleDelete(bike.id_bike_card)}
                    sx={{ alignSelf: "flex-end", margin: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>NO BIKES AVAILABLE</Typography>
          )}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ position: "fixed", bottom: 30, right: 30 }}
          onClick={() => (window.location.href = "/add-bike")}
        >
          Add Bike
        </Button>
      </main>
    </div>
  );
}
