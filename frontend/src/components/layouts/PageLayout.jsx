import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar.jsx";
import usePageLayoutStyles from "../../styles/PageLayoutStyles.js";

const PageLayout = ({ children }) => {
  const styles = usePageLayoutStyles();

  return (
    <Box sx={styles.container}>
      {/* Sidebar */}
      <Box component="aside" sx={styles.sidebar}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box component="main" sx={styles.main}>
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
