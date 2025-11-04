import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0566a6" },
    secondary: { main: "#78c5f4" },
    background: {
      default: "linear-gradient(130deg, rgba(120,197,244,1) 25%, rgba(5,66,103,1) 75%)",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    button: {
      letterSpacing: "2px",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
