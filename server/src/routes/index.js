import express from 'express';
import path from 'path';
import ExcelJS from 'exceljs';

import auth from './auth.route.js';
import student from './student.route.js';
import attendance from './attendance.route.js';
import { ROOT_DIR } from '#utils/directory.js';
import { getAllAttendanceLog } from '#services/attendance.service.js';
import { getTodayDateRange } from '#utils/dateRange.js';
import { formatDateTime, toTitleCase } from '#utils/format.js';
import { requireUserSession } from '#middlewares/auth-handler.js';

const router = express.Router();

router.use(
  '/display_photo',
  express.static(path.join(ROOT_DIR, 'students_display_photo'))
);

router.use('/api', auth, attendance);

router.use(requireUserSession);
router.use('/api', student);
router.get('/download-excel', async (_, res, next) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('SEMS Log');
    const { startOfDayPH, endOfDayPH } = getTodayDateRange();
    const query = { createdAt: { $gte: startOfDayPH, $lte: endOfDayPH } };

    const { attendance } = await getAllAttendanceLog(query);

    worksheet.columns = [
      { header: 'Student ID', key: 'student_id', width: 10 },
      { header: 'Card ID', key: 'card_id', width: 15 },
      { header: 'Name', key: 'full_name', width: 30 },
      { header: 'Date / Time', key: 'datetime', width: 50 },
    ];

    for (const record of attendance) {
      const { student, createdAt } = record;
      const { student_id, card_id, first_name, last_name } = student;
      worksheet.addRow({
        student_id,
        card_id,
        full_name: toTitleCase(`${first_name} ${last_name}`),
        datetime: formatDateTime(createdAt),
      });
    }
    // 4. Set the response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=letran-clockin-report.xlsx'
    );
    await workbook.xlsx.write(res);
    res.end();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

export default router;
