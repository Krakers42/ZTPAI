import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import theme from "./styles/theme.js";
import AuthProvider from "./context/AuthProvider";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
