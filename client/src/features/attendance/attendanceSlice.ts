import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAttendanceLog } from './attendanceThunks';
import type { AttendanceProps, ErrorProps } from '@/lib/types';
import { getAttendanceToday } from '../dashboard/utils/getAttendanceToday';

interface AttendanceState {
  attendanceLog: AttendanceProps[];
  entryToday: number;
  exitToday: number;
  isLoading: boolean;
  error: ErrorProps | null;
}

const initialState: AttendanceState = {
  attendanceLog: [],
  entryToday: 0,
  exitToday: 0,
  isLoading: true,
  error: null,
};

const attendanceLogSlice = createSlice({
  name: 'attendanceLog',
  initialState,
  reducers: {
    addAttendanceLog: (state, action: PayloadAction<AttendanceProps>) => {
      state.attendanceLog.push(action.payload);
      state.entryToday = getAttendanceToday(state.attendanceLog, 'entry');
      state.exitToday = getAttendanceToday(state.attendanceLog, 'exit');
      state.error = null;
    },
  },
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
        state.entryToday = getAttendanceToday(action.payload, 'entry');
        state.exitToday = getAttendanceToday(action.payload, 'exit');
      })
      .addCase(fetchAttendanceLog.rejected, (state, action) => {
        state.attendanceLog = [];
        state.isLoading = false;
        state.error = action.payload as ErrorProps;
      });
  },
});

export const { addAttendanceLog } = attendanceLogSlice.actions;

export default attendanceLogSlice.reducer;
