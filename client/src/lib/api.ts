import { logoutUser } from '@/features/auth/userSlice';
import store from '@/store';
import axios from 'axios';

export const backendUrl = `${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`;

const api = axios.create({
  baseURL: backendUrl,
});

// Logout automatically on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      store.dispatch(logoutUser());
    }
    return Promise.reject(err);
  },
);

export default api;
