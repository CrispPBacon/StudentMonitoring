import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addStudent,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from './studentThunks';
import type { ErrorProps, StudentProps } from '@/lib/types';
import { toast } from 'sonner';

interface StudentState {
  students: StudentProps[];
  isLoading: boolean;
  isRequestSent: boolean;
  error: ErrorProps | null;
}

const initialState: StudentState = {
  students: [],
  isLoading: true,
  isRequestSent: false,
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
        state.isRequestSent = false;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload || [];
        state.isLoading = false;
        state.isRequestSent = true;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.students = [];
        state.isLoading = false;
        state.isRequestSent = true;
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
      })

      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ErrorProps;
        toast.error(state.error.message);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        toast.success('Student update success');
        console.log(action.payload);
        state.students = state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student,
        );
        state.isLoading = false;
      })

      // Delete Student Record
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ErrorProps;
        toast.error(state.error.message);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => action.payload._id != student._id,
        );
        state.isLoading = false;
      });
  },
});

export default studentSlice.reducer;
