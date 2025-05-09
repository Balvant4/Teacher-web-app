import axios from "axios";

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  withCredentials: true,
});

export default api;
