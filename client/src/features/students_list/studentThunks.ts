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
    firstName: string;
    lastName: string;
    studentID: string;
    cardID: string;
    program: string;
    year: string;
    student_display_photo?: File;
  }
>('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('firstName', credentials.firstName);
    formData.append('lastName', credentials.lastName);
    formData.append('studentID', credentials.studentID);
    formData.append('card_id', credentials.cardID);
    formData.append('program', credentials.program);
    formData.append('year', credentials.year);

    if (credentials?.student_display_photo) {
      formData.append(
        'student_display_photo',
        credentials.student_display_photo,
      );
    }
    const { data } = await api.post<StudentProps>('/api/student', formData);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    console.log(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || 'Login failed',
    );
  }
});
