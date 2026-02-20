export function getTodayDateRange(): { startOfDayPH: Date; endOfDayPH: Date } {
  const now = new Date();

  // Convert to Philippines timezone
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Manila',
    hour12: false,
  };
  const phNow = new Date(now.toLocaleString('en-US', options));

  // Start of the day in PH timezone
  const startOfDayPH = new Date(phNow);
  startOfDayPH.setHours(0, 0, 0, 0);

  // End of the day in PH timezone
  const endOfDayPH = new Date(phNow);
  endOfDayPH.setHours(23, 59, 59, 999);

  return { startOfDayPH, endOfDayPH };
}

// utils/dateFormatter.ts

export interface PHDate {
  month: string;
  day: string;
  year: number;
  hour: string;
  minute: string;
  unit: 'AM' | 'PM';
}

/**
 * Converts a timestamp (string or Date) to a formatted Philippine date.
 */
export function formatPHDate(timestamp: string | Date): PHDate {
  const date = new Date(timestamp);

  // Convert to Manila time
  const phDate = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
  );

  const month = String(phDate.getMonth() + 1).padStart(2, '0');
  const day = String(phDate.getDate()).padStart(2, '0');
  const year = phDate.getFullYear();

  const { hour, unit } = convert24To12Hour(phDate.getHours());
  const minute = String(phDate.getMinutes()).padStart(2, '0');

  const hourStr = hour < 10 ? `0${hour}` : `${hour}`;

  return { month, day, year, hour: hourStr, minute, unit };
}

/**
 * Converts 24-hour hour (number) to 12-hour format with AM/PM
 */
export function convert24To12Hour(hour24: number): {
  hour: number;
  unit: 'AM' | 'PM';
} {
  if (hour24 < 0 || hour24 > 23) throw new Error('Invalid hour');

  const unit: 'AM' | 'PM' = hour24 >= 12 ? 'PM' : 'AM';
  let hour = hour24 % 12;
  hour = hour === 0 ? 12 : hour;

  return { hour, unit };
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
