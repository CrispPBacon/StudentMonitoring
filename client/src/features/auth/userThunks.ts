import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { type User } from './userSlice';
import type { AxiosError } from 'axios';

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string }
>('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post<User>('/api/auth/login', credentials);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Login failed',
    );
  }
});

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      await api.post('/api/auth/logout');
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log(error.response?.data?.message);
      return thunkAPI.rejectWithValue(false);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk<User | null>(
  'user/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<User>('/api/auth/login');
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log(error.response?.data?.message);
      return thunkAPI.rejectWithValue(null);
    }
  },
);
