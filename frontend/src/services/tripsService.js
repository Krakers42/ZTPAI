import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/trips`;

export const getTrips = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data;
};

export const addTrip = async (payload) => {
  const res = await axios.post(`${API}/add`, payload, { withCredentials: true });
  return res.data;
};

export const updateTrip = async (id, payload) => {
  const res = await axios.put(`${API}/edit/${id}`, payload, { withCredentials: true });
  return res.data;
};

export const deleteTrip = async (id) => {
  const res = await axios.delete(`${API}/delete/${id}`, { withCredentials: true });
  return res.data;
};
