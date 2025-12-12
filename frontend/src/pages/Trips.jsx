import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Table, TableHead, TableBody,
  TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

import TripsLayout from "../components/layouts/PageLayout.jsx";
import useTripsStyles from "../styles/TripsStyles.js";
import { getTrips, addTrip, updateTrip, deleteTrip } from "../services/tripsService.js";

export default function Trips() {
  const styles = useTripsStyles();

  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", distance: "", elevation: "", description: "" });
  const [editTrip, setEditTrip] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <Box sx={styles.main}>
        <Typography variant="h4" sx={styles.title}>TRIPS</Typography>

        {/* Form */}
        <Box sx={styles.formWrapper}>
          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            sx={styles.textField}
          />
          <TextField
            label="Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
            sx={styles.textField}
          />
          <TextField
            label="Distance (km)"
            type="number"
            value={form.distance}
            onChange={e => setForm({ ...form, distance: e.target.value })}
            sx={styles.textField}
          />
          <TextField
            label="Elevation (m)"
            type="number"
            value={form.elevation}
            onChange={e => setForm({ ...form, elevation: e.target.value })}
            sx={styles.textField}
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            sx={styles.textField}
          />
          <Box sx={styles.formButtonWrapper}>
            <Button variant="contained" onClick={handleAdd}>Add Trip</Button>
          </Box>
        </Box>

        {/* Table */}
        <Box sx={styles.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.tableHeaderCell}>ID</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Date</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Time</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Distance</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Elevation</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Description</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
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
                    <Box sx={styles.actionButtons}>
                      <Button variant="outlined" onClick={() => openEdit(trip)}>Edit</Button>
                      <Button variant="outlined" color="secondary" onClick={() => handleDelete(trip.id_trip)}>Delete</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Edit Dialog */}
        <Dialog open={!!editTrip} onClose={() => setEditTrip(null)} fullWidth maxWidth="sm">
          <DialogTitle sx={styles.dialogTitle}>Edit Trip</DialogTitle>
          <DialogContent>
            <Box sx={styles.dialogContentBox}>
              <TextField
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={editTrip?.date || ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, date: e.target.value } : null)}
                sx={styles.textField}
              />
              <TextField
                label="Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={editTrip?.time || ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, time: e.target.value } : null)}
                sx={styles.textField}
              />
              <TextField
                label="Distance (m)"
                type="number"
                value={editTrip?.distance ?? ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, distance: e.target.value } : null)}
                sx={styles.textField}
              />
              <TextField
                label="Elevation (m)"
                type="number"
                value={editTrip?.elevation ?? ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, elevation: e.target.value } : null)}
                sx={styles.textField}
              />
              <TextField
                label="Description"
                value={editTrip?.description ?? ""}
                onChange={e => setEditTrip(prev => prev ? { ...prev, description: e.target.value } : null)}
                sx={styles.textField}
              />
            </Box>
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
