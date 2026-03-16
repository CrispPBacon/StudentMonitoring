import express from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from '../controllers/student.controller.js';

import upload from '../config/multer.js';

const router = express.Router();

router.route('/student/:id').delete(deleteStudent);
router
  .route('/student')
  .get(getAllStudents)
  .post(upload.single('display_photo'), createStudent);
router
  .route('/student/:id')
  .post(upload.single('display_photo'), updateStudent);

export default router;
