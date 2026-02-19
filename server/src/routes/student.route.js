import express from 'express';
import {
  CreateStudent,
  GetAllStudents,
  UploadDisplayPhoto,
} from '../controllers/student.controller.js';

import upload from '../config/multer.js';

const router = express.Router();

router.route('/student/all').get(GetAllStudents);

router
  .route('/student')
  .post(upload.single('student_display_photo'), CreateStudent);

// UPDATE DISPLAYP PHOTO
router
  .route('/student/display_photo')
  .post(upload.single('student_display_photo'), UploadDisplayPhoto);

export default router;
