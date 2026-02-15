import { logStudentEntry } from '../services/attendance.service.js';
import { getStudentByCardId } from '../services/student.service.js';

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

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
