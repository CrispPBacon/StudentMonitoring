import express from 'express';
import {
  EntryLog,
  GetAttendanceLog,
} from '../controllers/attendance.controller.js';

const router = express.Router();

router.route('/attendance').get(GetAttendanceLog).post(EntryLog);

export default router;
