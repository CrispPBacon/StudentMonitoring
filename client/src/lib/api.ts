import axios from 'axios';

const HOST = import.meta.env.VITE_BACKEND_HOST;
const ip = import.meta.env.VITE_LOCAL_IP;
const port = import.meta.env.VITE_BACKEND_PORT || 3000;

export const backendUrl = HOST
  ? `${import.meta.env.VITE_BACKEND_HOST}:${port}`
  : `http://${ip}:${port}`;

console.log(backendUrl);
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Logout automatically on 401

export default api;
