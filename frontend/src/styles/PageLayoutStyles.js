export default function usePageLayoutStyles() {
  return {
    container: {
      display: "flex",
      height: "100vh",
    },
    sidebar: {
      width: 240,
      backgroundColor: "#1976d2",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 2,
    },
    main: {
      flexGrow: 1,
      backgroundColor: "rgba(184, 225, 250, 0.5)",
      overflowY: "auto",
      padding: 4,
    },
  };
}
