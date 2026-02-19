import express from 'express';
import path from 'path';

import auth from './auth.route.js';
import student from './student.route.js';
import attendance from './attendance.route.js';
import { ROOT_DIR } from '../utils/directory.js';

const router = express.Router();

router.use(
  '/display_photo',
  express.static(path.join(ROOT_DIR, 'students_display_photo'))
);

router.use('/api', auth, student, attendance);

export default router;
