import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/bikes`;

export const addBike = async ({ name, description, file }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (file) formData.append("image", file);

  const res = await axios.post(`${API}/add`, formData, { withCredentials: true });
  return res.data;
};

export const getBikes = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data;
};

export const deleteBike = async (id) => {
  const res = await axios.delete(`${API}/${id}`, { withCredentials: true });
  return res.data;
};
