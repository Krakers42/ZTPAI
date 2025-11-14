export default function useDashboardStyles() {
  return {
    title: {
      mb: 5,
      fontFamily: "Roboto, sans-serif",
    },
    gridContainer: {
      px: 3,
      pb: 5,
    },
    card: {
      borderRadius: 3,
      textAlign: "center",
      height: 250,
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
