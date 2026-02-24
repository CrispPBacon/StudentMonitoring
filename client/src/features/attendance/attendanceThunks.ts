import type { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import type { AttendanceProps } from '@/lib/types';

type attendanceQuery = {
  pagination: { count: number; pageCount: number };
  attendance: AttendanceProps[] | [];
};
export const fetchAttendanceLog = createAsyncThunk<
  attendanceQuery | null,
  { filter?: string; page?: number; limit?: number } | undefined
>('student/fetchAttendanceLog', async (credentials, thunkAPI) => {
  try {
    const { filter, page, limit } = credentials || {};

    // QUERY VALIDATIOn
    let query = '';
    if (page && filter) query = `?filter=${filter}&page=${page}`;
    else if (filter) query = `?filter=${filter}`;
    else if (page) query = `?page=${page}&limit=${limit ? limit : 20}`;
    const endpoint = `/api/attendance${query}`;

    const { data } = await api.get<attendanceQuery>(endpoint);

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

export const AttendanceLog = createAsyncThunk<
  AttendanceProps,
  { student_id: string } | undefined
>('student/AttendanceLog', async (credentials, thunkAPI) => {
  try {
    // QUERY VALIDATIOn
    const student_id = credentials?.student_id;
    const endpoint = `/api/attendance/${student_id}`;
    const { data } = await api.post<AttendanceProps>(endpoint);

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
