import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Typography, TextField, Button, Table, TableHead, TableBody,
  TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions,
  Paper, Stack
} from "@mui/material";
import TripsLayout from "../components/layouts/PageLayout.jsx";
import useTripsStyles from "../styles/TripsStyles.js";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", distance: "", elevation: "", description: "" });
  const [editTrip, setEditTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;
  const styles = useTripsStyles();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/trips`)
      .then(res => setTrips(res.data))
      .catch(err => console.error("Error fetching trips:", err))
      .finally(() => setLoading(false));
  }, [API]);

  const handleAdd = async () => {
    if (!form.date) return alert("Date is required");
    try {
      const res = await axios.post(`${API}/api/trips/add`, {
        date: form.date,
        time: form.time || null,
        distance: form.distance ? parseInt(form.distance) : 0,
        elevation: form.elevation ? parseInt(form.elevation) : null,
        description: form.description || null,
      });
      setTrips(prev => [res.data, ...prev]);
      setForm({ date: "", time: "", distance: "", elevation: "", description: "" });
    } catch (err) {
      console.error("Error adding trip:", err);
      alert("Add failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete trip?")) return;
    try {
      await axios.delete(`${API}/api/trips/delete/${id}`);
      setTrips(prev => prev.filter(t => t.id_trip !== id));
    } catch (err) {
      console.error("Error deleting trip:", err);
      alert("Delete failed");
    }
  };

  const openEdit = (trip) => {
    setEditTrip({
      ...trip,
      date: trip.date ? trip.date.split("T")[0] : "",
    });
  };

  const handleEditSave = async () => {
    if (!editTrip) return;
    try {
      const payload = {
        date: editTrip.date,
        time: editTrip.time || null,
        distance: editTrip.distance ? parseInt(editTrip.distance) : 0,
        elevation: editTrip.elevation ? parseInt(editTrip.elevation) : null,
        description: editTrip.description || null,
      };
      const res = await axios.put(`${API}/api/trips/edit/${editTrip.id_trip}`, payload);
      const updated = res.data;
      setTrips(prev => prev.map(t => t.id_trip === updated.id_trip ? updated : t));
      setEditTrip(null);
    } catch (err) {
      console.error("Error editing trip:", err);
      alert("Edit failed");
    }
  };

  return (
    <TripsLayout>
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>TRIPS</Typography>

        <Paper sx={styles.formPaper}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
            <TextField
              label="Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
            />
            <TextField
              label="Distance (m)"
              type="number"
              value={form.distance}
              onChange={e => setForm({ ...form, distance: e.target.value })}
            />
            <TextField
              label="Elevation (m)"
              type="number"
              value={form.elevation}
              onChange={e => setForm({ ...form, elevation: e.target.value })}
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <Button variant="contained" onClick={handleAdd}>Add trip</Button>
          </Stack>
        </Paper>

        <Paper sx={styles.tablePaper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Elevation</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7}>Loading...</TableCell></TableRow>
              ) : trips.length === 0 ? (
                <TableRow><TableCell colSpan={7}>NO TRIPS</TableCell></TableRow>
              ) : trips.map(trip => (
                <TableRow key={trip.id_trip}>
                  <TableCell>{trip.id_trip}</TableCell>
                  <TableCell>{trip.date ? trip.date.split("T")[0] : ""}</TableCell>
                  <TableCell>{trip.time || ""}</TableCell>
                  <TableCell>{trip.distance ?? ""}</TableCell>
                  <TableCell>{trip.elevation ?? ""}</TableCell>
                  <TableCell>{trip.description ?? ""}</TableCell>
                  <TableCell>
                    <Button size="small" sx={styles.actionsButton} onClick={() => openEdit(trip)}>Edit</Button>
                    <Button size="small" color="error" sx={styles.actionsButton} onClick={() => handleDelete(trip.id_trip)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Dialog open={!!editTrip} onClose={() => setEditTrip(null)}>
          <DialogTitle>Edit trip</DialogTitle>
          <DialogContent sx={styles.dialogContent}>
            <Stack spacing={2} sx={styles.stackSpacing}>
              <TextField
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={editTrip?.date || ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, date: e.target.value } : null)}
              />
              <TextField
                label="Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={editTrip?.time || ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, time: e.target.value } : null)}
              />
              <TextField
                label="Distance (m)"
                type="number"
                value={editTrip?.distance ?? ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, distance: e.target.value } : null)}
              />
              <TextField
                label="Elevation (m)"
                type="number"
                value={editTrip?.elevation ?? ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, elevation: e.target.value } : null)}
              />
              <TextField
                label="Description"
                value={editTrip?.description ?? ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, description: e.target.value } : null)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTrip(null)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>Save changes</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </TripsLayout>
  );
}
