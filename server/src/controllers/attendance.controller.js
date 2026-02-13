import { logStudentEntry } from '../services/attendance.service.js';
import { getStudentByCardId } from '../services/student.service.js';

/* <--- Attendance Controller ---> */
// export async function EntryLog(req, res, next) {
//   let statusCode = 401;
//   let type = 'entry';
//   const TAP_COOLDOWN_MS = 5 * 1000; // 10 seconds

//   try {
//     // NOTE: Get HTTP data and validate
//     const { card_id } = req.body || {};
//     if (!card_id) return res.sendStatus(statusCode);

//     // NOTE: Get student data and validate.
//     const student = await getStudentByCardId(card_id);
//     if (!student) return res.sendStatus(statusCode);
//     const { _id } = student || {};

//     // NOTE: Get latest entry log type ('entry' or 'exit')
//     const last_log = await getAttendanceLog(_id);
//     if (last_log.type === 'entry') type = 'exit';
//     if (last_log) {
//       const now = Date.now();
//       const lastTap = new Date(last_log.createdAt).getTime();

//       // ⛔ Ignore double tap within 10 seconds
//       if (now - lastTap < TAP_COOLDOWN_MS) {
//         return res.sendStatus(429);
//       }
//     }

//     // NOTE: Add entry log to the database.
//     await addAttendanceLog(_id, type);
//     console.log(last_log);

//     // NOTE: Return a response to ESP32.
//     statusCode = 200;
//     return res.sendStatus(statusCode);
//   } catch (error) {
//     next(error);
//   }
// }

export async function EntryLog(req, res, next) {
  try {
    const { card_id } = req.body ?? {};
    if (!card_id) return res.sendStatus(401);

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
