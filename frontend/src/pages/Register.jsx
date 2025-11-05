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
  MenuItem,
  InputAdornment,
} from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.surname ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.role
    ) {
      setMsg("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/auth/register", {
        name: form.name,
        surname: form.surname,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setMsg("Account created!");
      nav("/login");
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
        fontFamily: "'Roboto', sans-serif",
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
          <img
            src="/public/images/logo.svg"
            alt="Logo"
            style={{
              width: "100px",
              marginBottom: "10px",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          />

          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            REGISTER
          </Typography>

          <Typography color="text.secondary" variant="h6">
            Welcome!
          </Typography>

          <Typography color="error" sx={{ minHeight: "24px" }}>
            {msg}
          </Typography>

          <form
            onSubmit={submit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={form.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-person"></i>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Surname"
              name="surname"
              variant="outlined"
              value={form.surname}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-person"></i>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={form.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-envelope"></i>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-door-open"></i>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-door-open"></i>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              fullWidth
              label="Choose Role"
              name="role"
              variant="outlined"
              value={form.role}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-user-shield"></i>
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 1,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              CONTINUE
            </Button>
          </form>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#0566a6" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
