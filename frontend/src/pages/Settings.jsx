import React, { useContext } from "react";
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from "@mui/material";
import PageLayout from "./PageLayout.jsx";
import { SettingsContext } from "../context/SettingsContext.js";

export default function Settings() {
  const { settings, updateSetting } = useContext(SettingsContext);

  const fontSizes = { small: "14px", medium: "16px", large: "20px" };
  const fontColors = { black: "#000", blue: "#1976d2", green: "#388e3c", red: "#d32f2f" };

  return (
    <Box sx={{ display: "flex" }}>
      <PageLayout />
      <main
        style={{
          flex: 1,
          padding: 30,
          backgroundColor: settings.bgColor,
          color: fontColors[settings.fontColor],
          fontSize: fontSizes[settings.fontSize],
        }}
      >
        <Typography variant="h4" gutterBottom>
          {settings.funMode ? "⚡ Fun Settings ⚡" : "Settings"}
        </Typography>

        <Paper sx={{ p: 3, borderRadius: 3, maxWidth: 400 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Font Size</InputLabel>
            <Select
              value={settings.fontSize}
              onChange={(e) => updateSetting("fontSize", e.target.value)}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Font Color</InputLabel>
            <Select
              value={settings.fontColor}
              onChange={(e) => updateSetting("fontColor", e.target.value)}
            >
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="red">Red</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={settings.funMode}
                onChange={(e) => updateSetting("funMode", e.target.checked)}
              />
            }
            label="Fun Mode 😎"
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Background Color</InputLabel>
            <Select
              value={settings.bgColor}
              onChange={(e) => updateSetting("bgColor", e.target.value)}
            >
              <MenuItem value="#fff">White</MenuItem>
              <MenuItem value="#f0f0f0">Light Gray</MenuItem>
              <MenuItem value="#ffebee">Pinkish</MenuItem>
              <MenuItem value="#e8f5e9">Greenish</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </main>
    </Box>
  );
}
