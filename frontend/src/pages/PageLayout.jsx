import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const PageLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Aside */}
      <Box
        component="aside"
        sx={{
          width: 240,
          backgroundColor: "#1976d2",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 2,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "rgba(184, 225, 250, 0.5)",
          overflowY: "auto",
          padding: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
