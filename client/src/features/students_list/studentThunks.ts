import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import type { AxiosError } from 'axios';
import type { StudentProps } from '@/lib/types';

export const fetchStudents = createAsyncThunk<StudentProps[] | null>(
  'student/fetchStudents',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<StudentProps[]>('/api/student/all');
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

export const addStudent = createAsyncThunk<
  StudentProps,
  {
    first_name: string;
    last_name: string;
    student_id: string;
    card_id: string;
    display_photo?: File | null | string;
  }
>('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(credentials).forEach(([key, val]) => {
      if (val instanceof File) {
        formData.append(key, val);
      } else if (typeof val === 'string') {
        formData.append(key, val);
        console.log(key, val);
      } else if (val) {
        console.log(key, val);
        formData.append(key, JSON.stringify(val));
      }
    });

    console.log(Object.fromEntries(formData.entries()));
    const { data } = await api.post<StudentProps>('/api/student', formData);
    console.log(data);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    console.log(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || 'Login failed',
    );
  }
});
