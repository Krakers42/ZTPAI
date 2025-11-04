import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", { email, password });
      setMsg("Logged in!");
      nav("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.error || "Connection error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(130deg, rgba(120,197,244,1) 25%, rgba(5,66,103,1) 75%)",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            BikeBase Login
          </Typography>

          <Typography color="error" sx={{ minHeight: "24px" }}>
            {msg}
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={submit}
            sx={{
              mt: 1,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            CONTINUE
          </Button>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link to="/forgot-password" style={{ color: "#0566a6", textDecoration: "none" }}>
                Forgot password?
              </Link>
            </Typography>

            <Typography variant="body2">
              <Link to="/register" style={{ color: "#0566a6", textDecoration: "none", fontWeight: 500 }}>
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
