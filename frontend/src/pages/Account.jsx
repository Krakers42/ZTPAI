import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AccountLayout from "../components/layouts/PageLayout.jsx";
import { styles } from "../styles/AccountStyles.js";
import {
  getCurrentUser,
  getAllUsers,
  deleteUser,
} from "../services/accountService.js";

export default function Account() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await getCurrentUser();
        setUser(me);

        if (me.role === "admin") {
          const all = await getAllUsers();
          setUsers(all);
        }
      } catch {
        alert("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await deleteUser(id);

      if (res.logout) {
        window.location.href = "/login";
      } else {
        setUsers((prev) => prev.filter((u) => u.id_user !== id));
        if (user.id_user === id) setUser(null);
      }
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>Error loading account.</Typography>;

  return (
    <AccountLayout>
      <Box sx={styles.main}>
        <Typography variant="h4" align="center" sx={styles.title}>
          ACCOUNT
        </Typography>

        {/* User card */}
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="h6">Surname: {user.surname}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Role: {user.role}</Typography>
            <Typography variant="h6">ID: {user.id_user}</Typography>
          </CardContent>
        </Card>

        {/* Delete your own account */}
        {user.role !== "admin" && (
          <Box sx={styles.deleteBox}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(user.id_user)}
            >
              Delete my account
            </Button>
          </Box>
        )}

        {/* Admin users table */}
        {user.role === "admin" && (
          <Box sx={styles.adminBox}>
            <Typography variant="h5" align="center" gutterBottom>
              All Users
            </Typography>

            <Table sx={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeaderCell}>Name</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>Surname</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>Email</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>ID</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id_user}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.surname}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>{u.id_user}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(u.id_user)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </AccountLayout>
  );
}
