import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";
import useMainStyles from "../styles/MainStyles.js";
import { login } from "../services/authService.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const styles = useMainStyles();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setMsg("Logged in!");
      nav("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.error || "Connection error");
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={styles.paper}>
          <img src="/images/logo.svg" alt="Logo" style={styles.logo} />

          <Typography variant="h4" sx={styles.title}>LOGIN</Typography>
          <Typography variant="h6" color="text.secondary">Welcome back!</Typography>
          <Typography sx={styles.errorMsg}>{msg}</Typography>

          <form onSubmit={submit} style={styles.form}>
            <TextField fullWidth label="Email" variant="outlined" sx={styles.textField} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField fullWidth label="Password" type="password" variant="outlined" sx={styles.textField} value={password} onChange={(e) => setPassword(e.target.value)} required />

            <Button fullWidth variant="contained" size="large" type="submit" sx={styles.submitButton}>
              CONTINUE
            </Button>
          </form>

          <Box sx={styles.linkBox}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link to="/forgot-password" style={styles.link}>Forgot password?</Link>
            </Typography>

            <Typography variant="body2">
              <Link to="/register" style={styles.link}>Register</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
