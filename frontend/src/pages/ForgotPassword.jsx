import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, Typography, Box, Container, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import useMainStyles from "../styles/MainStyles.js";
import { resetPassword } from "../services/authService.js";

export default function ForgotPassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const styles = useMainStyles();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      await resetPassword(token, password1);
      setMessage("Password successfully changed!");

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={styles.paper}>
          <img src="/images/logo.svg" alt="Logo" style={styles.logo} />

          <Typography variant="h4" sx={styles.title}>
            RESET PASSWORD
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Choose a new password
          </Typography>

          <form onSubmit={handleSubmit} style={styles.form}>
            <TextField
              fullWidth
              label="New password"
              type="password"
              value={password1}
              sx={styles.textField}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              value={password2}
              sx={styles.textField}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />

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

          {message && (
            <Typography
              variant="body2"
              color={message.includes("successfully") ? "success.main" : "error.main"}
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}

          <Box sx={styles.linkBox}>
            <Typography variant="body2">
              <Link to="/login" style={styles.link}>Back</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
