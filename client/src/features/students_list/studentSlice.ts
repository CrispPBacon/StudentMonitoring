import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addStudent, fetchStudents } from './studentThunks';
import type { ErrorProps, StudentProps } from '@/lib/types';

interface StudentState {
  students: StudentProps[];
  isLoading: boolean;
  error: ErrorProps | null;
}

const initialState: StudentState = {
  students: [],
  isLoading: true,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    studentAdd: (state, action: PayloadAction<StudentProps>) => {
      state.students.push(action.payload);
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //   STUDENTS
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload || [];
        state.isLoading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.students = [];
        state.isLoading = false;
        state.error = action.payload as ErrorProps;
      })

      // ADD STUDENT
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ErrorProps;
      });
  },
});

export default studentSlice.reducer;
