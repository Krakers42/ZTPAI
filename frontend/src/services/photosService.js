import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/photos`;

export const getPhotos = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data;
};

export const uploadPhoto = async (file) => {
  const fd = new FormData();
  fd.append("image", file);
  const res = await axios.post(`${API}/upload`, fd, { withCredentials: true });
  return res.data;
};

export const deletePhoto = async (id) => {
  const res = await axios.delete(`${API}/${id}`, { withCredentials: true });
  return res.data;
};
