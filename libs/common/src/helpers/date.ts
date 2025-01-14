import { formatInTimeZone } from 'date-fns-tz';
import { format, getUnixTime } from 'date-fns';
import { IsoDateTimeStamp, OneIndexedMonth, UnixTimestampSeconds } from '../types/date';

export const getNowAsUtcISOString = (): IsoDateTimeStamp =>
  `${formatInTimeZone(new Date(), '+00:00', 'yyyy-MM-dd')}T${formatInTimeZone(new Date(), '+00:00', 'HH:mm:ss.SSS xxxxxx')}`;

/**
 * Returns the long month name associated with the given month number
 * @param monthNumber - 1-indexed month number
 * @returns month as a string
 */
export const getMonthName = (monthNumber: OneIndexedMonth) => {
  const currentYear = new Date().getFullYear();
  const date = new Date(currentYear, monthNumber - 1);
  return format(date, 'MMMM');
};

/**
 * Returns the Unix timestamp (seconds) associated with the given date
 * @param date - date to convert
 * @returns Unix timestamp in seconds
 */
export const getUnixTimestampSeconds: (date: Date) => UnixTimestampSeconds = getUnixTime;
