import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import useMainStyles from "../styles/MainStyles.js";
import { registerUser } from "../services/authService.js";

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
  const styles = useMainStyles();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      await registerUser(form);
      setMsg("Account created!");
      nav("/login");
    } catch (err) {
      setMsg(err.response?.data?.error || "Connection error");
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={styles.paper}>
          <img src="/images/logo.svg" alt="Logo" style={styles.logo} />

          <Typography variant="h4" sx={styles.title}>REGISTER</Typography>
          <Typography variant="h6" color="text.secondary">Welcome!</Typography>
          <Typography sx={styles.errorMsg}>{msg}</Typography>

          <form onSubmit={submit} style={styles.form}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={form.name}
              onChange={handleChange}
              required
              sx={styles.textField}
            />

            <TextField
              fullWidth
              label="Surname"
              name="surname"
              variant="outlined"
              value={form.surname}
              onChange={handleChange}
              required
              sx={styles.textField}
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
              sx={styles.textField}
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
              sx={styles.textField}
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
              sx={styles.textField}
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
              sx={styles.textField}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={styles.submitButton}
            >
              CONTINUE
            </Button>
          </form>

          <Box sx={styles.linkBox}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={styles.link}>Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
