import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Table, TableHead, TableBody,
  TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions,
  Paper, Stack
} from "@mui/material";
import TripsLayout from "../components/layouts/PageLayout.jsx";
import useTripsStyles from "../styles/TripsStyles.js";

import { getTrips, addTrip, updateTrip, deleteTrip } from "../services/tripsService.js";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", distance: "", elevation: "", description: "" });
  const [editTrip, setEditTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = useTripsStyles();

  useEffect(() => {
    setLoading(true);
    getTrips()
      .then(setTrips)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!form.date) return alert("Date is required");
    const newTrip = await addTrip({
      date: form.date,
      time: form.time || null,
      distance: form.distance ? parseInt(form.distance) : 0,
      elevation: form.elevation ? parseInt(form.elevation) : null,
      description: form.description || null,
    });
    setTrips(prev => [newTrip, ...prev]);
    setForm({ date: "", time: "", distance: "", elevation: "", description: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete trip?")) return;
    await deleteTrip(id);
    setTrips(prev => prev.filter(t => t.id_trip !== id));
  };

  const handleEditSave = async () => {
    if (!editTrip) return;
    const updated = await updateTrip(editTrip.id_trip, {
      date: editTrip.date,
      time: editTrip.time || null,
      distance: editTrip.distance ? parseInt(editTrip.distance) : 0,
      elevation: editTrip.elevation ? parseInt(editTrip.elevation) : null,
      description: editTrip.description || null,
    });
    setTrips(prev => prev.map(t => t.id_trip === updated.id_trip ? updated : t));
    setEditTrip(null);
  };

  const openEdit = (trip) => setEditTrip({ ...trip, date: trip.date?.split("T")[0] || "" });

  return (
    <TripsLayout>
      <Box sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom>TRIPS</Typography>

        {/* Form */}
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
            <TextField label="Time" type="time" InputLabelProps={{ shrink: true }} value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            <TextField label="Distance (m)" type="number" value={form.distance} onChange={e => setForm({ ...form, distance: e.target.value })} />
            <TextField label="Elevation (m)" type="number" value={form.elevation} onChange={e => setForm({ ...form, elevation: e.target.value })} />
            <TextField label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <Button variant="contained" onClick={handleAdd}>Add trip</Button>
          </Stack>
        </Paper>

        {/* Table */}
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
                  <TableCell>{trip.date?.split("T")[0]}</TableCell>
                  <TableCell>{trip.time || ""}</TableCell>
                  <TableCell>{trip.distance ?? ""}</TableCell>
                  <TableCell>{trip.elevation ?? ""}</TableCell>
                  <TableCell>{trip.description ?? ""}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => openEdit(trip)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(trip.id_trip)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Edit dialog */}
        <Dialog open={!!editTrip} onClose={() => setEditTrip(null)}>
          <DialogTitle>Edit trip</DialogTitle>
          <DialogContent sx={styles.dialogContent}>
            <Stack spacing={2}>
              <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} value={editTrip?.date || ""} onChange={e => setEditTrip(prev => prev ? { ...prev, date: e.target.value } : null)} />
              <TextField label="Time" type="time" InputLabelProps={{ shrink: true }} value={editTrip?.time || ""} onChange={e => setEditTrip(prev => prev ? { ...prev, time: e.target.value } : null)} />
              <TextField label="Distance (m)" type="number" value={editTrip?.distance ?? ""} onChange={e => setEditTrip(prev => prev ? { ...prev, distance: e.target.value } : null)} />
              <TextField label="Elevation (m)" type="number" value={editTrip?.elevation ?? ""} onChange={e => setEditTrip(prev => prev ? { ...prev, elevation: e.target.value } : null)} />
              <TextField label="Description" value={editTrip?.description ?? ""} onChange={e => setEditTrip(prev => prev ? { ...prev, description: e.target.value } : null)} />
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
