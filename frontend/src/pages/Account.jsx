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
import axios from "axios";
import AccountLayout from "./PageLayout";

export default function Account() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`).then((res) => {
      setUser(res.data);
      if (res.data.role === "admin") {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/users`)
          .then((res) => setUsers(res.data))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
    if (res.data.logout) {
      window.location.href = "/login";
    } else {
      setUsers(users.filter((u) => u.id_user !== id));
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>Error loading user data.</Typography>;

  return (
    <div style={{ display: "flex" }}>
      <AccountLayout />
      <main style={{ flex: 1, padding: "30px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          ACCOUNT
        </Typography>

        <Card sx={{ maxWidth: 500, margin: "0 auto", borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="h6">Surname: {user.surname}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Role: {user.role}</Typography>
            <Typography variant="h6">ID: {user.id_user}</Typography>
          </CardContent>
        </Card>

        {user.role !== "admin" && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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

        {user.role === "admin" && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom>
              All Users
            </Typography>

            <Table sx={{ maxWidth: 800, margin: "0 auto", backgroundColor: "white" }}>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Surname</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Role</b></TableCell>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
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
      </main>
    </div>
  );
}
