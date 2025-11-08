import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import GearPartsLayout from "./PageLayout";

export default function GearParts() {
  const [gearParts, setGearParts] = useState([]);
  const [form, setForm] = useState({ purchase_date: '', name: '', value: '', comment: '' });
  const [editPart, setEditPart] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/gear_parts`)
      .then(res => setGearParts(res.data))
      .catch(err => console.error("Error fetching gear parts:", err));
  }, []);

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/gear_parts/add`, form);
      setGearParts(prev => [...prev, res.data]);
      setForm({ purchase_date: '', name: '', value: '', comment: '' });
    } catch (err) {
      console.error("Error adding gear part:", err);
    }
  };

  const handleEdit = async () => {
    if (!editPart) return;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/gear_parts/edit/${editPart.id_gear_part}`,
        editPart
      );
      const updatedPart = res.data;
      setGearParts(prev =>
        prev.map(p => p.id_gear_part === updatedPart.id_gear_part ? updatedPart : p)
      );
      setEditPart(null);
    } catch (err) {
      console.error("Error editing gear part:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete part?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/gear_parts/delete/${id}`);
      setGearParts(prev => prev.filter(p => p.id_gear_part !== id));
    } catch (err) {
      console.error("Error deleting gear part:", err);
    }
  };

  return (
    <GearPartsLayout>
      <div style={{ padding: '2rem' }}>
        <h1>GEAR & PARTS</h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <TextField
            label="Purchase Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.purchase_date}
            onChange={e => setForm({ ...form, purchase_date: e.target.value })}
          />
          <TextField
            label="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Value"
            type="number"
            value={form.value}
            onChange={e => setForm({ ...form, value: e.target.value })}
          />
          <TextField
            label="Comment"
            value={form.comment}
            onChange={e => setForm({ ...form, comment: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Part
          </Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gearParts.map(part => (
              <TableRow key={part.id_gear_part}>
                <TableCell>{part.id_gear_part}</TableCell>
                <TableCell>{part.purchase_date ? part.purchase_date.split('T')[0] : ''}</TableCell>
                <TableCell>{part.name}</TableCell>
                <TableCell>{part.value}</TableCell>
                <TableCell>{part.comment}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setEditPart(part)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(part.id_gear_part)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={!!editPart} onClose={() => setEditPart(null)}>
          <DialogTitle>Edit Part</DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
            <TextField
              label="Purchase Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editPart?.purchase_date ? editPart.purchase_date.split('T')[0] : ''}
              onChange={e => setEditPart(prev => prev ? { ...prev, purchase_date: e.target.value } : null)}
            />
            <TextField
              label="Name"
              value={editPart?.name || ''}
              onChange={e => setEditPart(prev => prev ? { ...prev, name: e.target.value } : null)}
            />
            <TextField
              label="Value"
              type="number"
              value={editPart?.value || ''}
              onChange={e => setEditPart(prev => prev ? { ...prev, value: parseInt(e.target.value) || 0 } : null)}
            />
            <TextField
              label="Comment"
              value={editPart?.comment || ''}
              onChange={e => setEditPart(prev => prev ? { ...prev, comment: e.target.value } : null)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditPart(null)}>Cancel</Button>
            <Button onClick={handleEdit} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </GearPartsLayout>
  );
}
