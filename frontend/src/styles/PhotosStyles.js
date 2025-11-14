export default function usePhotosStyles() {
  return {
    main: {
      flex: 1,
      padding: "30px",
      backgroundColor: "#f9f9f9",
      color: "#222",
      fontSize: "1rem",
      minHeight: "100vh",
    },
    uploadPaper: (isDragging) => ({
      border: "2px dashed #9e9e9e",
      borderRadius: 3,
      p: 3,
      textAlign: "center",
      mb: 4,
      backgroundColor: isDragging ? "#f5f5f5" : "transparent",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    }),
    previewBox: {
      mb: 3,
      textAlign: "center",
    },
    previewImage: {
      width: "100%",
      maxWidth: 400,
      height: "auto",
      borderRadius: 3,
      boxShadow: 2,
      opacity: 0,
      transform: "scale(0.95)",
      animation: "fadeInZoom 0.4s ease forwards",
      "@keyframes fadeInZoom": {
        "0%": { opacity: 0, transform: "scale(0.95)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
    },
    uploadButton: {
      mt: 2,
    },
    card: {
      borderRadius: 3,
      boxShadow: 3,
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
    deleteButton: {
      alignSelf: "flex-end",
      margin: 1,
    },
    noPhotosText: {
      marginTop: "20px",
      textAlign: "center",
      fontStyle: "italic",
      color: "#555",
    },
  };
}
