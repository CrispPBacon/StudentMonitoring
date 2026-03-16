import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import type { AxiosError } from 'axios';
import type { StudentProps } from '@/lib/types';

export const fetchStudents = createAsyncThunk<
  StudentProps[] | null,
  { page?: number } | undefined
>('student/fetchStudents', async (_, thunkAPI) => {
  try {
    // console.log(credentials);
    const { data } = await api.get<StudentProps[]>('/api/student');
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    console.log(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || 'Fetch students failed',
    );
  }
});

export const addStudent = createAsyncThunk<
  StudentProps,
  {
    first_name: string;
    last_name: string;
    student_id: string;
    card_id: string;
    display_photo?: File | null | string;
  }
>('student/addStudent', async (credentials, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(credentials).forEach(([key, val]) => {
      if (val instanceof File) {
        formData.append(key, val);
      } else if (typeof val === 'string') {
        formData.append(key, val);
      } else if (val) {
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
      error.response?.data?.error || 'Add Student failed',
    );
  }
});

export const updateStudent = createAsyncThunk<
  StudentProps,
  {
    _id: string;
    first_name: string;
    last_name: string;
    student_id: string;
    card_id: string;
    finger_id: string;
    education: StudentProps['education'];
    display_photo?: File | null | string;
    guardian?: {
      email?: string;
      phone_number?: string;
      notification?: string;
    };
  }
>('student/updateStudent', async (credentials, thunkAPI) => {
  try {
    // const {
    //   first_name,
    //   last_name,
    //   education,
    //   student_id,
    //   card_id,
    //   finger_id,
    //   _id,
    // } = credentials;

    // console.log(
    //   first_name,
    //   last_name,
    //   education,
    //   student_id,
    //   card_id,
    //   finger_id,
    //   education,
    //   _id,
    // );

    const formData = new FormData();
    Object.entries(credentials).forEach(([key, val]) => {
      if (val instanceof File) {
        formData.append(key, val);
      } else if (typeof val === 'string') {
        formData.append(key, val);
      } else if (val) {
        formData.append(key, JSON.stringify(val));
      }
    });

    const { data } = await api.post<StudentProps>(
      `/api/student/${credentials._id}`,
      formData,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    console.log(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || 'Update failed',
    );
  }
});

export const deleteStudent = createAsyncThunk<
  StudentProps,
  {
    _id: string;
  }
>('student/deleteStudent', async (credentials, thunkAPI) => {
  try {
    // const { data } = await api.post<StudentProps>(
    //   `/api/student/${credentials._id}`,
    //   credentials,
    // );

    const { data } = await api.delete<StudentProps>(
      `/api/student/${credentials._id}`,
    );

    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    console.log(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || 'Delete failed',
    );
  }
});
