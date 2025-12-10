export default function usePageLayoutStyles() {
  return {

    container: {
      display: "flex",
      height: "100vh",
      minHeight: "100vh",
    },

    sidebar: {
      color: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    
    main: {
      flexGrow: 1,
      backgroundColor: "rgba(184, 225, 250, 0.5)",
      overflowY: "auto",
      minHeight: "100vh",
      minWidth: "400px",
    },
  };
}
