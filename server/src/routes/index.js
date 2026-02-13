import express from 'express';

import auth from './auth.route.js';
import student from './student.route.js';
import attendance from './attendance.route.js';

const router = express.Router();

router.use('/api', auth, student, attendance);

export default router;
