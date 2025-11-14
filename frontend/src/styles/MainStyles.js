export default function useLoginStyles() {
  return {
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(130deg, rgba(120,197,244,1) 25%, rgba(5,66,103,1) 75%)",
    },
    paper: {
      p: 4,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
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
      color: "#0566a6",
      textDecoration: "none",
      fontWeight: 500,
    },
    errorMsg: {
      minHeight: "24px",
      color: "error.main",
    },
  };
}
