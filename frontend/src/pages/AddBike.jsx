import React, { useState, useCallback } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import AddBikesLayout from "../components/layouts/PageLayout.jsx";
import useAddBikeStyles from "../styles/AddBikeStyles.js";
import "../animations/fadeInZoom.css";

import { addBike } from "../services/bikesService.js";

export default function AddBike() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const styles = useAddBikeStyles();

  const handleFileChange = (selectedFile) => {
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

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBike({ name: title, description, file });
      window.location.href = "/bikes";
    } catch (err) {
      console.error(err);
      alert("Failed to add bike");
    }
  };

  return (
    <AddBikesLayout>

      <Typography variant="h4" align="center" sx={styles.title}>
        ADD NEW BIKE
      </Typography>

      <Box sx={styles.formWrapper}>

        <Paper sx={styles.paper}>

          <Typography variant="h6" align="center" gutterBottom>
            Fill in the details
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
      </Box>

    </AddBikesLayout>
  );
}
