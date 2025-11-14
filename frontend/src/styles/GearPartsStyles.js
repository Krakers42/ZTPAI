export default function useGearPartsStyles() {
  return {
    main: {
      padding: "2rem",
      animation: "fadeInZoom 0.3s ease",
    },

    title: {
      fontSize: "2rem",
      fontWeight: 700,
      marginBottom: "1.5rem",
      color: "#0d47a1",
      textAlign: "left",
    },

    formRow: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },

    table: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },

    tableHeaderCell: {
      fontWeight: "bold",
      backgroundColor: "rgba(25,118,210,0.2)",
    },

    actionButtons: {
      display: "flex",
      gap: "0.5rem",
    },

    dialogContent: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      minWidth: "300px",
    },
  };
}
