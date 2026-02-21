import {
  getAllAttendanceLog,
  logStudentEntry,
} from '../services/attendance.service.js';
import { getStudentByCardId } from '../services/student.service.js';
import { getIO } from '../socket/index.js';
import { getTodayDateRange } from '../utils/dateRange.js';

/* <--- Attendance Controller ---> */
export async function EntryLog(req, res, next) {
  try {
    let { card_id } = req.body ?? {};
    if (card_id.includes(' ')) card_id = card_id.replaceAll(' ', '_');
    if (!card_id) return res.sendStatus(401);
    const finger_id = 1;
    if (finger_id <= 0) console.log('ok');
    console.log(card_id);

    const student = await getStudentByCardId(card_id);
    if (!student) return res.sendStatus(401);

    // Silent ignore for double tap
    const { log, ignored } = await logStudentEntry(student._id);
    if (ignored) {
      return res.sendStatus(429);
    }

    const { display_photo } = student;
    const URL = `${process.env.URL}/display_photo/${display_photo}`;

    const { type, createdAt, _id } = log;
    const attendanceData = {
      _id,
      student: { ...student._doc, display_photo: URL },
      type,
      createdAt,
    };
    console.log(attendanceData);

    getIO().emit('attendance', attendanceData);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function GetAttendanceLog(_, res, next) {
  try {
    const data = await getAllAttendanceLog();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function GetTodayAttendanceLog(_, res, next) {
  try {
    const { startOfDayPH, endOfDayPH } = getTodayDateRange();
    const query = { createdAt: { $gte: startOfDayPH, $lte: endOfDayPH } };
    const data = await getAllAttendanceLog(query);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
