import { CardContent } from "@mui/material";

export default function useBikesStyles() {
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
      overflowY: "auto",
      maxHeight: "calc(100vh - 120px)",
    },

    card: {
      position: "relative",
      borderRadius: 5,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: "400px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "2px 6px 14px rgba(0, 0, 0, 0.15)",
      },
    },

    cardMedia: {
      width: "100%",
      height: "auto",
      maxHeight: 300,
      objectFit: "contain",
      display: "block",
    },

    addButton: {
      position: "fixed",
      bottom: 30,
      right: 30,
      borderRadius: "50px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    },

    noBikesText: {
      marginTop: "20px",
      textAlign: "center",
      fontStyle: "italic",
      color: "#555",
    },

    deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.7)",
    "&:hover": { backgroundColor: "rgba(255,255,255,1)" }
    }
  };
}
