import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AttendanceLog, fetchAttendanceLog } from './attendanceThunks';
import type { AttendanceProps, ErrorProps } from '@/lib/types';
import { getAttendanceToday } from '../dashboard/utils/getAttendanceToday';

interface AttendanceState {
  attendanceLog: AttendanceProps[];
  entryToday: number;
  exitToday: number;
  page: number;
  pageCount: number;
  isLoading: boolean;
  isRequestSent: boolean;
  error: ErrorProps | null;
}

const initialState: AttendanceState = {
  attendanceLog: [],
  entryToday: 0,
  exitToday: 0,
  page: 1,
  pageCount: 1,
  isLoading: true,
  isRequestSent: false,
  error: null,
};

const attendanceLogSlice = createSlice({
  name: 'attendanceLog',
  initialState,
  reducers: {
    addAttendanceLog: (state, action: PayloadAction<AttendanceProps>) => {
      console.log(action.payload);
      state.attendanceLog = [action.payload, ...state.attendanceLog];
      state.entryToday = getAttendanceToday(state.attendanceLog, 'entry');
      state.exitToday = getAttendanceToday(state.attendanceLog, 'exit');
      state.error = null;
    },
    nextPage: (state) => {
      if (state.page === state.pageCount) return;
      state.page += 1;
    },
    previousPage: (state) => {
      if (state.page == 1) return;
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      //   STUDENTS
      .addCase(fetchAttendanceLog.pending, (state) => {
        state.isLoading = true;
        state.isRequestSent = false;
        state.error = null;
      })
      .addCase(fetchAttendanceLog.fulfilled, (state, action) => {
        const newLog = action.payload?.attendance || [];
        // console.log(newLog);
        // const log = [
        //   ...state.attendanceLog,
        //   ...newLog.filter(
        //     (item) =>
        //       !state.attendanceLog.some((exist) => exist._id === item._id),
        //   ),
        // ];
        state.attendanceLog = [...newLog];
        state.isLoading = false;
        state.isRequestSent = true;
        state.entryToday = getAttendanceToday(newLog, 'entry');
        state.exitToday = getAttendanceToday(newLog, 'exit');
        state.pageCount = action.payload?.pagination.pageCount || 0;
      })
      .addCase(fetchAttendanceLog.rejected, (state, action) => {
        state.attendanceLog = [];
        state.isLoading = false;
        state.isRequestSent = true;
        state.error = action.payload as ErrorProps;
      })

      // MANUAL ATTENDANCE LOGGING
      .addCase(AttendanceLog.pending, (state) => {
        state.isLoading = true;
        state.isRequestSent = false;
        state.error = null;
      })
      .addCase(AttendanceLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isRequestSent = true;
        state.error = action.payload as ErrorProps;
      })
      .addCase(AttendanceLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRequestSent = true;

        state.attendanceLog = [action.payload, ...state.attendanceLog];
      });
  },
});

export const { addAttendanceLog, nextPage, previousPage } =
  attendanceLogSlice.actions;

export default attendanceLogSlice.reducer;
