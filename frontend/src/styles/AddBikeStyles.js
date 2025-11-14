import "../animations/fadeInZoom.css";

export default function useAddBikeStyles() {
  return {
    main: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 0",
      backgroundColor: "#f9f9f9",
      color: "#222",
      fontSize: "1rem",
      minHeight: "100vh",
    },
    paper: {
      padding: 24,
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      width: "100%",
      maxWidth: 500,
      backgroundColor: "#fff",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
      },
    },
    uploadBox: (isDragging) => ({
      border: "2px dashed #9e9e9e",
      borderRadius: 8,
      padding: 16,
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: isDragging ? "#efefef" : "transparent",
      transition: "background-color 0.3s ease",
      fontStyle: "italic",
      color: "#555",
    }),
    preview: {
      width: "100%",
      height: 200,
      objectFit: "cover",
      borderRadius: 8,
      marginTop: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
  };
}
