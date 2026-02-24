import express from 'express';
import {
  EntryLog,
  EntryLogByStudentID,
  GetAttendanceLog,
} from '../controllers/attendance.controller.js';

const router = express.Router();

router.route('/attendance').get(GetAttendanceLog).post(EntryLog);
router.route('/attendance/:student_id').post(EntryLogByStudentID);

export default router;
