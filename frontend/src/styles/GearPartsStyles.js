export default function useGearPartsStyles() {
  return {
    main: {
      flex: 1,
      padding: "0 24px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "auto",
    },

    title: {
      mt: 4,
      mb: 4,
      textAlign: "center",
    },

    formWrapper: {
      width: "100%",
      maxWidth: "1000px",
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      mb: 4,
      alignItems: "flex-end",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: 1.5,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },

    tableWrapper: {
      width: "100%",
      maxWidth: "1000px",
      backgroundColor: "#fff",
      borderRadius: 1.5,
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },

    tableHeaderCell: {
      fontWeight: "bold",
      backgroundColor: "rgba(7, 116, 224, 0.35)",
    },

    actionButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },

    formButtonWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    
    dialogTitle: {
      textAlign: "center",
      width: "100%",
      mb: 1,
      mt: 1,
    },

    dialogContentBox: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      mt: 1,
      alignItems: "center",
      textAlign: "center",
      width: "100%",
    },

    textField: {
      width: "100%",
    },
  };
}
