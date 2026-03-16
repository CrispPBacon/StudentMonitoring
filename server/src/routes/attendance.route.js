import express from 'express';
import {
  logExitAndEntry,
  getAttendanceLog,
} from '#controllers/attendance.controller.js';
import { requireUserSession } from '#middlewares/auth-handler.js';

const router = express.Router();

router
  .route('/attendance/:student_id')
  .get(requireUserSession, getAttendanceLog)
  .post(logExitAndEntry);
router
  .route('/attendance')
  .get(requireUserSession, getAttendanceLog)
  .post(logExitAndEntry);

export default router;
