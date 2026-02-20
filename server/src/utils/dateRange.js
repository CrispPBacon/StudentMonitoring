export function getTodayDateRange() {
  const now = new Date();

  // Convert to Philippines timezone
  const options = { timeZone: 'Asia/Manila', hour12: false };
  const phNow = new Date(now.toLocaleString('en-US', { ...options }));

  const startOfDayPH = new Date(phNow);
  startOfDayPH.setHours(0, 0, 0, 0);

  const endOfDayPH = new Date(phNow);
  endOfDayPH.setHours(23, 59, 59, 999);
  return { startOfDayPH, endOfDayPH };
}

export function getDateRangeInManila(year, month, day) {
  // month is 1-12
  const datePH = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  // Manila is UTC+8
  const startUTC = new Date(datePH.getTime() - 8 * 60 * 60 * 1000);
  const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000 - 1);
  return { startUTC, endUTC };
}
