import express from 'express';
import {
  CreateStudent,
  DeleteStudent,
  GetAllStudents,
  UpdateStudent,
  UploadDisplayPhoto,
} from '../controllers/student.controller.js';

import upload from '../config/multer.js';

const router = express.Router();

router.route('/student/:id').delete(DeleteStudent);
router.route('/student').get(GetAllStudents);
router.route('/student').post(upload.single('display_photo'), CreateStudent);
router
  .route('/student/:id')
  .post(upload.single('display_photo'), UpdateStudent);

// UPDATE DISPLAYP PHOTO
router
  .route('/student/display_photo')
  .post(upload.single('student_display_photo'), UploadDisplayPhoto);

export default router;
