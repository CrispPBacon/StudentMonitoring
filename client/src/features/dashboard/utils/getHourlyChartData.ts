import type { AttendanceProps } from '@/lib/types';
import {
  initialChartData,
  type ChartDataProps,
  type HourlyCount,
} from '../constants/chartData';
import { formatPHDate } from '@/utils/formatDate';
import { getAttendanceTodayData } from './getAttendanceToday';

export function getHourlyChartData(attendanceLog: AttendanceProps[]) {
  type LogMap = Record<string, HourlyCount>;
  const log = getAttendanceTodayData(attendanceLog);
  const logMap = log.reduce((acc: LogMap, curr: AttendanceProps) => {
    const time = formatPHDate(curr.createdAt);
    const logHour = `${time.hour}:00 ${time.unit}`;

    if (!acc[logHour]) acc[logHour] = { entry: 0, exit: 0 };
    acc[logHour][curr.type] += 1;

    return acc;
  }, {});

  const chartData: ChartDataProps[] = initialChartData.map(({ hour }) => {
    const counts: HourlyCount = logMap[hour] || { entry: 0, exit: 0 };
    return { hour, entry: counts.entry, exit: counts.exit };
  });

  return chartData;
}
