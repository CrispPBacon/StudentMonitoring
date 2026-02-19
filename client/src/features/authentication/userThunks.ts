import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import type { AxiosError } from 'axios';
import type { User } from '@/lib/types';

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string }
>('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post<User>('/api/auth/login', credentials);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    console.log(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || 'Login failed',
    );
  }
});

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      await api.delete('/api/auth/logout');
      return true;
    } catch (err) {
      const error = err as AxiosError<{ error: { message: string } }>;
      console.log(error?.response?.data?.error);
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
      const error = err as AxiosError<{ error: { message: string } }>;
      console.log(error?.response?.data?.error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Session failed',
      );
    }
  },
);
