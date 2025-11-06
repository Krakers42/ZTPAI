import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import AddBikesLayout from "./PageLayout";

export default function AddBike() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    if (file) formData.append("image", file);

    await axios.post(`${import.meta.env.VITE_API_URL}/api/bikes/add`, formData);
    window.location.href = "/bikes";
  };

  return (
    <div style={{ display: "flex" }}>
      <AddBikesLayout />
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3, width: "100%", maxWidth: 500 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Add New Bike
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button variant="outlined" component="label">
              Upload Image
              <input hidden type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Button>
            <Button variant="contained" color="primary" type="submit">
              SEND
            </Button>
          </Box>
        </Paper>
      </main>
    </div>
  );
}
