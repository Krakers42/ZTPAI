import axios from "axios";

export async function login(email, password) {
  return axios.post("/api/auth/login", { email, password });
}

export async function registerUser(form) {
  return axios.post("/api/auth/register", form);
}

export async function forgotPassword(email) {
  return axios.post("/api/auth/forgot-password", { email });
}

export async function resetPassword(token, password) {
  return axios.post("/api/auth/reset-password", { token, password });
}
