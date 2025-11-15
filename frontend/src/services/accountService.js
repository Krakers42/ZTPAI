import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getCurrentUser = async () => {
  const res = await axios.get(`${API}/api/users/me`, { withCredentials: true });
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get(`${API}/api/users`, { withCredentials: true });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/api/users/${id}`, { withCredentials: true });
  return res.data;
};
