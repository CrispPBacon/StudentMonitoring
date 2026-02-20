export const initialChartData: ChartDataProps[] = [
  { hour: '07:00 AM', entry: 0, exit: 0 },
  { hour: '08:00 AM', entry: 0, exit: 0 },
  { hour: '09:00 AM', entry: 0, exit: 0 },
  { hour: '10:00 AM', entry: 0, exit: 0 },
  { hour: '11:00 AM', entry: 0, exit: 0 },
  { hour: '12:00 PM', entry: 0, exit: 0 },
  { hour: '01:00 PM', entry: 0, exit: 0 },
  { hour: '02:00 PM', entry: 0, exit: 0 },
  { hour: '03:00 PM', entry: 0, exit: 0 },
  { hour: '04:00 PM', entry: 0, exit: 0 },
  { hour: '05:00 PM', entry: 0, exit: 0 },
];

export interface ChartDataProps extends HourlyCount {
  hour: string;
}

export interface HourlyCount {
  entry: number;
  exit: number;
}
