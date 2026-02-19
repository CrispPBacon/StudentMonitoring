import express from 'express';
import {
  EntryLog,
  GetAttendanceLog,
  GetTodayAttendanceLog,
} from '../controllers/attendance.controller.js';

const router = express.Router();

router.route('/attendance').get(GetAttendanceLog).post(EntryLog);
router.route('/attendance/today').get(GetTodayAttendanceLog); // NOTE: DASHBOARD

export default router;
