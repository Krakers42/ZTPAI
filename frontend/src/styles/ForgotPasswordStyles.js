export default function useForgotPasswordStyles() {
  return {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      padding: 2,
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
      width: "100%",
      maxWidth: 400,
      borderRadius: 3,
      boxShadow: 3,
      backgroundColor: "white",
      textAlign: "center",
    },
    logo: {
      width: 100,
      marginBottom: 20,
    },
  };
}
