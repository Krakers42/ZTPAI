import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/gear_parts`;

export const getGearParts = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data;
};

export const addGearPart = async (payload) => {
  const res = await axios.post(`${API}/add`, payload, { withCredentials: true });
  return res.data;
};

export const updateGearPart = async (id, payload) => {
  const res = await axios.put(`${API}/edit/${id}`, payload, { withCredentials: true });
  return res.data;
};

export const deleteGearPart = async (id) => {
  const res = await axios.delete(`${API}/delete/${id}`, { withCredentials: true });
  return res.data;
};
