import React, { useState, useEffect } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

import GearPartsLayout from "../components/layouts/PageLayout.jsx";
import useGearPartsStyles from "../styles/GearPartsStyles.js";

import {
  getGearParts,
  addGearPart,
  updateGearPart,
  deleteGearPart
} from "../services/gearPartsService.js";

export default function GearParts() {
  const styles = useGearPartsStyles();

  const [gearParts, setGearParts] = useState([]);
  const [form, setForm] = useState({ purchase_date: '', name: '', value: '', comment: '' });
  const [editPart, setEditPart] = useState(null);

  useEffect(() => {
    getGearParts().then(setGearParts);
  }, []);

  const handleAdd = async () => {
    const newPart = await addGearPart(form);
    setGearParts(prev => [...prev, newPart]);
    setForm({ purchase_date: '', name: '', value: '', comment: '' });
  };

  const handleEdit = async () => {
    if (!editPart) return;

    const updated = await updateGearPart(editPart.id_gear_part, editPart);

    setGearParts(prev =>
      prev.map(p => p.id_gear_part === updated.id_gear_part ? updated : p)
    );

    setEditPart(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete part?")) return;

    await deleteGearPart(id);
    setGearParts(prev => prev.filter(p => p.id_gear_part !== id));
  };

  return (
    <GearPartsLayout>
      <div style={styles.main}>
        <h1 style={styles.title}>GEAR & PARTS</h1>

        {/* Add form */}
        <div style={styles.formRow}>
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
          <Button variant="contained" onClick={handleAdd}>
            Add Part
          </Button>
        </div>

        {/* Table */}
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeaderCell}>ID</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Purchase Date</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Name</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Value</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Comment</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {gearParts.map(part => (
              <TableRow key={part.id_gear_part}>
                <TableCell>{part.id_gear_part}</TableCell>
                <TableCell>{part.purchase_date?.split("T")[0]}</TableCell>
                <TableCell>{part.name}</TableCell>
                <TableCell>{part.value}</TableCell>
                <TableCell>{part.comment}</TableCell>
                <TableCell>
                  <div style={styles.actionButtons}>
                    <Button
                      variant="outlined"
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Edit dialog */}
        <Dialog open={!!editPart} onClose={() => setEditPart(null)}>
          <DialogTitle>Edit Part</DialogTitle>

          <DialogContent sx={styles.dialogContent}>
            <TextField
              label="Purchase Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editPart?.purchase_date?.split("T")[0] || ""}
              onChange={e =>
                setEditPart(prev => ({ ...prev, purchase_date: e.target.value }))
              }
            />
            <TextField
              label="Name"
              value={editPart?.name || ""}
              onChange={e =>
                setEditPart(prev => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              label="Value"
              type="number"
              value={editPart?.value || ""}
              onChange={e =>
                setEditPart(prev => ({ ...prev, value: e.target.value }))
              }
            />
            <TextField
              label="Comment"
              value={editPart?.comment || ""}
              onChange={e =>
                setEditPart(prev => ({ ...prev, comment: e.target.value }))
              }
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setEditPart(null)}>Cancel</Button>
            <Button onClick={handleEdit} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </GearPartsLayout>
  );
}
