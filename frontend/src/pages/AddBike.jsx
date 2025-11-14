import React, { useState, useCallback } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import AddBikesLayout from "../components/layouts/PageLayout.jsx";
import useAddBikeStyles from "../styles/AddBikeStyles.js";
import "../animations/fadeInZoom.css";

export default function AddBike() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const styles = useAddBikeStyles();

  const handleFileChange = (f) => {
    const selectedFile = f;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

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
      <main style={styles.main}>
        <Paper sx={styles.paper}>
          <Typography variant="h5" align="center" gutterBottom>
            Add New Bike
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              sx={styles.uploadBox(isDragging)}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <Typography variant="body2" color="textSecondary">
                Drag & Drop image here or click to select
              </Typography>
              <input
                id="fileInput"
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </Box>

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="preview"
                sx={styles.preview}
                className="fadeInZoom"
              />
            )}

            <Button variant="contained" color="primary" type="submit">
              SEND
            </Button>
          </Box>
        </Paper>
      </main>
    </div>
  );
}
