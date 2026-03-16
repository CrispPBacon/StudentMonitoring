import { configureStore } from '@reduxjs/toolkit';
import { studentReducer } from './features/StudentsLog';
import { attendanceLogReducer } from './features/AttendanceLog';
import { userReducer } from './features/Authentication';
const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    attendanceLog: attendanceLogReducer,
  },
});

export default store;

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
