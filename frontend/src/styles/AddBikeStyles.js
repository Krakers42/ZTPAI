export default function useAddBikeStyles() {
  return {
    title: {
      mt: 4,
      mb: 2,
      textAlign: "center",
      color: "#222",
    },

    formWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      boxSizing: "border-box",
      minWidth: "400px",
    },

    paper: {
      width: "100%",
      maxWidth: 600,
      padding: 4,
      borderRadius: 5,
      backgroundColor: "#fff",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
      },
    },

    uploadBox: (isDragging) => ({
      border: "2px dashed #9e9e9e",
      borderRadius: 3,
      padding: 16,
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: isDragging ? "#efefef" : "transparent",
      transition: "background-color 0.3s ease",
      fontStyle: "italic",
      color: "#555",
    }),

    preview: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: 3,
      marginTop: 1,
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      display: "block",
    },
  };
}
