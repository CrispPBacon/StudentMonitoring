import axios from 'axios';

export const backendUrl = `${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`;

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Logout automatically on 401

export default api;
