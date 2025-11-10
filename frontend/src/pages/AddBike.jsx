import React, { useState, useCallback } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import AddBikesLayout from "./PageLayout";

export default function AddBike() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 0",
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: 3,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Add New Bike
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
              sx={{
                border: "2px dashed #9e9e9e",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragging ? "#f5f5f5" : "transparent",
                transition: "background-color 0.3s ease",
              }}
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
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mt: 2,
                  boxShadow: 1,
                  opacity: 0,
                  transform: "scale(0.95)",
                  animation: "fadeInZoom 0.4s ease forwards",
                  "@keyframes fadeInZoom": {
                    "0%": { opacity: 0, transform: "scale(0.95)" },
                    "100%": { opacity: 1, transform: "scale(1)" },
                  },
                }}
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
