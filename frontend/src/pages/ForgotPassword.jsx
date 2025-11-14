import { useState } from "react";
import { TextField, Button, Typography, Box, Container, Paper } from "@mui/material";
import useMainStyles from "../styles/MainStyles.js";

export default function ForgotPassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const styles = useMainStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/reset_password_handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ password1, password2 }),
      });

      if (response.ok) {
        setMessage("Password successfully changed!");
      } else {
        setMessage("An error occurred. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Connection error.");
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={styles.paper}>
          <img src="/images/logo.svg" alt="Logo" style={styles.logo} />

          <Typography variant="h4" sx={styles.title}>RESET PASSWORD</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Forgotten password? No worries!
          </Typography>

          <form onSubmit={handleSubmit} style={styles.form}>
            <TextField
              fullWidth
              label="New password"
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />

            <Button type="submit" fullWidth variant="contained" size="large" sx={styles.submitButton}>
              CONTINUE
            </Button>
          </form>

          <Button href="/login" variant="text" sx={{ mt: 2 }}>Back</Button>

          {message && (
            <Typography
              variant="body2"
              color={message.includes("successfully") ? "success.main" : "error.main"}
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
