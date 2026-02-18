type LogTypeKey = 'ENTRY' | 'EXIT' | 'UNAUTHORIZED';

interface LogType {
  title: string;
  color: string;
}

const logTypeMap: Record<LogTypeKey, LogType> = {
  ENTRY: {
    title: 'Entry Success',
    color: 'text-green-700',
  },
  EXIT: {
    title: 'Exit Success',
    color: 'text-green-700',
  },
  UNAUTHORIZED: {
    title: 'Access Denied',
    color: 'text-red-700',
  },
};

export function getDisplayMessage(type: LogTypeKey): LogType {
  return logTypeMap[type];
}
