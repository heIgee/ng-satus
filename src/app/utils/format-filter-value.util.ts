import { format, parse, isValid } from 'date-fns';

export function formatFilterValue(value: unknown): string {
  if (value instanceof Date) {
    return formatDateWithOptionalTime(value);
  }

  if (typeof value === 'string') {
    const formats = [
      'yyyy-MM-dd HH:mm:ss',
      'yyyy-MM-dd HH:mm',
      'yyyy-MM-dd',
      'MM/dd/yyyy HH:mm:ss',
      'MM/dd/yyyy HH:mm',
      'MM/dd/yyyy',
      'EEE MMM dd yyyy HH:mm:ss XXX',
    ];

    for (const dateFormat of formats) {
      const parsedDate = parse(value, dateFormat, new Date());
      if (isValid(parsedDate)) {
        return formatDateWithOptionalTime(parsedDate);
      }
    }
  }

  return String(value);
}

function formatDateWithOptionalTime(date: Date): string {
  const baseFormat = 'yyyy-MM-dd';
  const timeFormat = 'HH:mm';

  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (hours === 0 && minutes === 0) {
    return format(date, baseFormat);
  } else {
    return format(date, `${baseFormat} ${timeFormat}`);
  }
}
