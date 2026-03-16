import attendanceLogReducer, {
  addAttendanceLog,
  nextPage,
  previousPage,
} from './attendanceSlice';
import { fetchAttendanceLog } from './attendanceThunks';

export { attendanceLogReducer, fetchAttendanceLog };
export { addAttendanceLog, nextPage, previousPage };
