import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Box,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import PhotosLayout from "./PageLayout";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/photos`, { withCredentials: true })
      .then((res) => setPhotos(res.data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this photo?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/photos/${id}`, {
        withCredentials: true,
      });
      setPhotos(photos.filter((p) => p.id_photo !== id));
    }
  };

  const handleFileChange = (selected) => {
    const chosen = selected;
    setFile(chosen);
    setPreview(URL.createObjectURL(chosen));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/photos/upload`, fd, {
        withCredentials: true,
      });
      setPhotos([res.data.photo, ...photos]);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo");
    }
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

  return (
    <Box sx={{ display: "flex" }}>
      <PhotosLayout />
      <main style={{ flex: 1, padding: 30 }}>
        <Typography variant="h4" align="center" gutterBottom>
          PHOTOS
        </Typography>

        <Paper
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("photoUploadInput").click()}
          sx={{
            border: "2px dashed #9e9e9e",
            borderRadius: 3,
            p: 3,
            textAlign: "center",
            mb: 4,
            backgroundColor: isDragging ? "#f5f5f5" : "transparent",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "#757575" }} />
          <Typography variant="body2" color="textSecondary">
            Drag & Drop photo here or click to select
          </Typography>
          <input
            id="photoUploadInput"
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </Paper>

        {preview && (
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="subtitle1" gutterBottom>
              Preview
            </Typography>
            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                borderRadius: 3,
                boxShadow: 2,
                opacity: 0,
                transform: "scale(0.95)",
                animation: "fadeInZoom 0.4s ease forwards",
                "@keyframes fadeInZoom": {
                  "0%": { opacity: 0, transform: "scale(0.95)" },
                  "100%": { opacity: 1, transform: "scale(1)" },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleUpload}
            >
              Upload Photo
            </Button>
          </Box>
        )}

        <Grid container spacing={3}>
          {photos.length ? (
            photos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id_photo}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  {photo.path && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${import.meta.env.VITE_API_URL}/uploads/${photo.path}`}
                      alt="user photo"
                    />
                  )}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Uploaded on:{" "}
                      {photo.created_at
                        ? new Date(photo.created_at).toLocaleDateString("pl-PL", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "Unknown date"}
                    </Typography>
                  </CardContent>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(photo.id_photo)}
                    sx={{ alignSelf: "flex-end", margin: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No photos available</Typography>
          )}
        </Grid>
      </main>
    </Box>
  );
}