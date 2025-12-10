import { Padding } from "@mui/icons-material";

export default function useDashboardStyles() {
  return {
    
    title: {
      mt: 4,
      mb: 4,
      fontFamily: "Roboto, sans-serif",
    },

    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      pb: 5,
      padding: "0 24px",
    },
    
    card: {
      width: "100%",
      aspectRatio: "1 / 1",
      borderRadius: 3,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
      backgroundColor: "#fff",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
      },
    },
    
    cardValue: {
      mt: 1,
      color: "#333",
    },
  };
}
