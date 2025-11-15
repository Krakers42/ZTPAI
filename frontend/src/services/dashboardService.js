import axios from "axios";

export async function getDashboardStats() {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
    withCredentials: true,
  });
}
