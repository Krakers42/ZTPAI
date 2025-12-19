import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";

import DashboardLayout from "../components/layouts/PageLayout.jsx";
import useDashboardStyles from "../styles/DashboardStyles.js";
import { getDashboardStats } from "../services/dashboardService.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const styles = useDashboardStyles();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch {
        alert("Error loading Dashboard");
        setStats(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
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
      <Typography variant="h4" align="center" sx={styles.title}>
        DASHBOARD
      </Typography>

      <Box sx={styles.gridContainer}>
        {cards.map((card) => (
          <Card key={card.label} sx={styles.card}>
            <CardContent>
              <Typography variant="h4">{card.label}:</Typography>
              <Typography variant="h4" fontWeight="bold" sx={styles.cardValue}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </DashboardLayout>
  );
}
