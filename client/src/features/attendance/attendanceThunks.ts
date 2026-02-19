import type { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import type { AttendanceProps } from '@/lib/types';

export const fetchAttendanceLog = createAsyncThunk<AttendanceProps[] | null>(
  'student/fetchAttendanceLog',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<AttendanceProps[]>('/api/attendance');
      return data;
    } catch (err) {
      const error = err as AxiosError<{ error: { message: string } }>;
      console.log(error?.response?.data?.error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Login failed',
      );
    }
  },
);
