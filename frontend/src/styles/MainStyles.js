export default function useMainStyles() {
  return {
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:"linear-gradient(130deg, #78c5f4ff 25%, #054267ff 75%)",
      overflowY: "auto",
    },

    paper: {
      p: 4,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      backgroundColor: "transparent",
      boxShadow: "none",
      maxHeight: "100vh",
    },

    title: {
      fontWeight: "bold",
    },

    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },

    submitButton: {
      mt: 1,
      bgcolor: "primary.main",
      "&:hover": { bgcolor: "primary.dark" },
    },

    linkBox: {
      textAlign: "center",
      mt: 3,
    },

    link: {
      color: "#000000",
      textDecoration: "none",
      fontWeight: 550,
      fontSize: "16px",
    },

    errorMsg: {
      minHeight: "24px",
      color: "error.main",
    },

    textField: {
      backgroundColor: "white",
      borderRadius: "10px",
      "& .MuiInputLabel-root.Mui-focused": {
        color: "black",
        fontWeight: 600,
      },
      "& fieldset": {
        borderColor: "#78c5f4ff",
      },
      "&:hover fieldset": {
        borderColor: "#78c5f4ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0566a6",
      }
    },
  };
}