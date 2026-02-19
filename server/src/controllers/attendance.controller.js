import {
  getAllAttendanceLog,
  logStudentEntry,
} from '../services/attendance.service.js';
import { getStudentByCardId } from '../services/student.service.js';
import { getIO } from '../socket/index.js';

/* <--- Attendance Controller ---> */
export async function EntryLog(req, res, next) {
  try {
    let { card_id, finger_id } = req.body ?? {};
    if (card_id.includes(' ')) card_id = card_id.replaceAll(' ', '_');
    if (!card_id || finger_id <= 0) return res.sendStatus(401);

    const student = await getStudentByCardId(card_id);
    if (!student) return res.sendStatus(401);

    const result = await logStudentEntry(student._id);

    // Silent ignore for double tap
    if (result.ignored) {
      return res.sendStatus(429);
    }

    const { student_id, education, display_photo } = student;
    const URL = `${process.env.URL}/display_photo/${display_photo}`;
    const data = {
      student_id,
      display_photo: URL,
      program: education.program,
      type: result.type,
    };
    getIO().emit('attendance', data);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function GetAttendanceLog(req, res, next) {
  try {
    const data = await getAllAttendanceLog();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
