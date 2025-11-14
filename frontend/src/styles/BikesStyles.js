export default function useBikesStyles() {
  return {
    main: {
      flex: 1,
      padding: "30px",
      backgroundColor: "#f9f9f9",
      color: "#222",
      fontSize: "1rem",
      minHeight: "100vh",
    },
    card: {
      borderRadius: 12,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.15)",
      },
    },
    cardMedia: {
      height: 200,
      objectFit: "cover",
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
      alignSelf: "flex-end",
      margin: 1,
    },
  };
}
