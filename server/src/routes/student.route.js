import express from 'express';
import { CreateStudent } from '../controllers/student.controller.js';
import { getStudents } from '../services/student.service.js';

const router = express.Router();

router
  .route('/student')
  .get(async (_, res) => {
    const students = await getStudents();
    res.status(200).json(students);
  })
  .post(CreateStudent);

export default router;
