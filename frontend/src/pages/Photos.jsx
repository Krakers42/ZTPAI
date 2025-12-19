import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Button,
  Box,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import PhotosLayout from "../components/layouts/PageLayout.jsx";
import usePhotosStyles from "../styles/PhotosStyles.js";
import "../animations/fadeInZoom.css";

import {
  getPhotos,
  uploadPhoto,
  deletePhoto
} from "../services/photosService.js";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const styles = usePhotosStyles();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPhotos();
        setPhotos(data);
      } catch {
        alert("An error occured while downloading photos.");
      }
    };
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await deletePhoto(id);
      setPhotos((prev) => prev.filter((p) => p.id_photo !== id));
    } catch {
      alert("An error occured while deleting this photo.");
    }
  };

  const handleFileChange = (selected) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    try {
      const res = await uploadPhoto(file);
      setPhotos((prev) => [res.photo, ...prev]);
      setFile(null);
      setPreview(null);
    } catch {
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
    <PhotosLayout>
      <Box sx={styles.grid}>
        <Typography variant="h4" align="center" sx={styles.title}>
          PHOTOS
        </Typography>

        <Paper
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("photoUploadInput").click()}
          sx={styles.uploadPaper(isDragging)}
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
          <Box sx={styles.previewBox}>
            <Typography variant="h4" gutterBottom>
              Preview
            </Typography>

            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={styles.previewImage}
            />

            <Button
              variant="contained"
              color="primary"
              sx={styles.uploadButton}
              onClick={handleUpload}
            >
              Upload Photo
            </Button>
          </Box>
        )}

        <Grid container spacing={3} sx={styles.gridContainer}>
          {photos.length ? (
            photos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id_photo}>
                <Card sx={styles.card}>
                  {photo.path && (
                    <CardMedia
                      component="img"
                      sx={styles.cardMedia}
                      image={`${import.meta.env.VITE_API_URL}/uploads/${photo.path}`}
                      alt="user photo"
                    />
                  )}

                  <IconButton
                    color="error"
                    sx={styles.deleteButton}
                    onClick={() => handleDelete(photo.id_photo)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography sx={styles.noPhotosText}>
              No photos available
            </Typography>
          )}
        </Grid>
      </Box>
    </PhotosLayout>
  );
}
