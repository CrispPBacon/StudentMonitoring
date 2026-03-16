import {
  addStudent,
  updateStudent,
  deleteStudent,
  fetchStudents,
} from './studentThunks';
import studentReducer from './studentSlice';
import StudentTable from './components/StudentTable';

export {
  addStudent,
  updateStudent,
  deleteStudent,
  fetchStudents,
  studentReducer,
};
export { StudentTable };
