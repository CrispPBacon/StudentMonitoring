import express from 'express';
import { createStudent } from '../controllers/student.controller.js';
import { getStudents } from '../services/student.service.js';

const router = express.Router();

router
  .route('/student')
  .get(async (_, res) => {
    const students = await getStudents();
    res.status(200).json(students);
  })
  .post(createStudent);

export default router;
