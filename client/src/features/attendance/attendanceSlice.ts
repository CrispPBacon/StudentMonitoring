import { createSlice } from '@reduxjs/toolkit';
import { fetchAttendanceLog } from './attendanceThunks';
import type { AttendanceProps, ErrorProps } from '@/lib/types';

interface AttendanceState {
  attendanceLog: AttendanceProps[];
  isLoading: boolean;
  error: ErrorProps | null;
}

const initialState: AttendanceState = {
  attendanceLog: [],
  isLoading: true,
  error: null,
};

const attendanceLogSlice = createSlice({
  name: 'attendanceLog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   STUDENTS
      .addCase(fetchAttendanceLog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceLog.fulfilled, (state, action) => {
        state.attendanceLog = action.payload || [];
        state.isLoading = false;
      })
      .addCase(fetchAttendanceLog.rejected, (state, action) => {
        state.attendanceLog = [];
        state.isLoading = false;
        state.error = action.payload as ErrorProps;
      });
  },
});

export default attendanceLogSlice.reducer;
