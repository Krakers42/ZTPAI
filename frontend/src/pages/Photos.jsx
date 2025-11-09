import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import PhotosLayout from "./PageLayout";

export default function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/photos`, { withCredentials: true })
      .then((res) => setPhotos(res.data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this photo?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/photos/${id}`, { withCredentials: true });
      setPhotos(photos.filter((p) => p.id_photo !== id));
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/photos/upload`, fd, {
        withCredentials: true,
      });
      setPhotos([res.data.photo, ...photos]);
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PhotosLayout />
      <main style={{ flex: 1, padding: 30 }}>
        <Typography variant="h4" align="center" gutterBottom>
          PHOTOS
        </Typography>

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
                      Uploaded on: {new Date(photo.created_at).toLocaleDateString()}
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

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddPhotoAlternateIcon />}
          sx={{ position: "fixed", bottom: 30, right: 30 }}
          onClick={() => document.getElementById("photoUploadInput").click()}
        >
          Upload Photo
        </Button>

        <input
          type="file"
          id="photoUploadInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </main>
    </Box>
  );
}
