import express from 'express';
import { EntryLog } from '../controllers/attendance.controller.js';

const router = express.Router();

router.route('/attendance').post(EntryLog);

export default router;
