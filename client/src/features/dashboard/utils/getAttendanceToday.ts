import type { AttendanceProps } from '@/lib/types';
import { getTodayDateRange } from '@/utils/formatDate';

export function getAttendanceToday(
  list: AttendanceProps[] | null,
  type: AttendanceProps['type'],
) {
  const { startOfDayPH, endOfDayPH } = getTodayDateRange();
  if (!list) return 0;
  const attendanceToday = list.filter((r) => {
    if (r.type !== type) return false;
    const recordDate = new Date(r.createdAt);
    // Convert UTC to PH time
    const phRecordDate = new Date(
      recordDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
    );
    // Check if record is within today in PH
    return phRecordDate >= startOfDayPH && phRecordDate <= endOfDayPH;
  });

  return attendanceToday.length;
}

export function getAttendanceTodayData(
  list: AttendanceProps[] | null,
): AttendanceProps[] {
  if (!list) return [];

  const { startOfDayPH, endOfDayPH } = getTodayDateRange();

  return list.filter((r) => {
    const recordDate = new Date(r.createdAt);

    const phRecordDate = new Date(
      recordDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
    );

    return phRecordDate >= startOfDayPH && phRecordDate <= endOfDayPH;
  });
}
