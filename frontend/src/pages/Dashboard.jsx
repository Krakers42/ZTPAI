import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import DashboardLayout from "./PageLayout";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/dashboard`, { withCredentials: true })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );

  if (!stats)
    return (
      <DashboardLayout>
        <Typography align="center" mt={5}>
          Error loading data.
        </Typography>
      </DashboardLayout>
    );

  const cards = [
    { label: "Longest ride", value: `${stats.longestRide} km` },
    { label: "Trips", value: stats.tripCount },
    { label: "Distance", value: `${stats.totalDistance} km` },
    { label: "Photos", value: stats.photoCount },
    { label: "Biggest elevation", value: `${stats.maxElevation} m` },
  ];

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 5, fontFamily: "Roboto, sans-serif" }}
      >
        DASHBOARD
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ px: 3, pb: 5 }}
      >
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.label}>
            <Card
              sx={{
                borderRadius: 3,
                textAlign: "center",
                height: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                backgroundColor: "white",
              }}
            >
              <CardContent>
                <Typography variant="h6">{card.label}:</Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}
