import express from 'express';
import { getStudentByCardId } from '../services/student.service.js';

const router = express.Router();

router.route('/attendance').post(async (req, res, next) => {
  try {
    const { card_id } = req.body || {};
    const student = await getStudentByCardId(card_id);
    console.log(student);
    res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

export default router;
