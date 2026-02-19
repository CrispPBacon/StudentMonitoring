import { configureStore } from '@reduxjs/toolkit';
import { studentReducer } from './features/students_list';
import { attendanceLogReducer } from './features/attendance';
import { userReducer } from './features/authentication';
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
