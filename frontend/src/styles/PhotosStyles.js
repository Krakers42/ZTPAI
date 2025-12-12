export default function usePhotosStyles() {
  return {
    title: {
      mb: 4,
      mt: 4,
    },

    grid: {
      flex: 1,
      padding: "0 24px",
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
    },

    uploadButton: {
      mt: 2,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },

    gridContainer: {
      mt: 4,
    },

    card: {
      borderRadius: 3,
      boxShadow: 3,
      position: "relative",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.15)",
      },
    },

    cardMedia: {
      height: 200,
      objectFit: "cover",
    },

    deleteButton: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "white",
      boxShadow: 2,
      "&:hover": {
        backgroundColor: "#fff5f5",
      },
    },

    noPhotosText: {
      marginTop: "20px",
      textAlign: "center",
      fontStyle: "italic",
      color: "#555",
      width: "100%",
    },
  };
}
