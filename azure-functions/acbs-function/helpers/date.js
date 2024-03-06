const moment = require('moment');

/**
 * @param {string} dateStr
 * @returns {boolean} true if the date string is a valid date in the format `yyyy-MM-dd`
 * Does not allow date of month to wrap or months > 12 (e.g 2024-13-32 is invalid)
 */
const isDate = (dateStr) => moment(dateStr, 'YYYY-MM-DD', true).isValid();
/**
 * @param {string | number} epoch
 * @returns {boolean} true if the value given is a unix epoch in seconds or milliseconds
 * Epoch time must be less than 8640000000000000 {@link https://262.ecma-international.org/5.1/#sec-15.9.1.1 | (see docs)}
 */
const isEpoch = (epoch) => moment(epoch, 'x', true).isValid() || moment(epoch, 'X', true).isValid();
/**
 * @param {unknown} dateStr
 * @returns true if the value is a string and not an epoch
 */
const isString = (dateStr) => typeof dateStr === 'string' && !isEpoch(dateStr);
/**
 * @returns current date in format `yyyy-MM-dd`
 */
const now = () => moment().format('YYYY-MM-DD');

/**
 * @param {number | string} year as a 2 or 4 digit number
 * @returns year formatted as 4 digits (adds 2000 if < 1000)
 */
const formatYear = (year) => (year < 1000 ? (2000 + parseInt(year, 10)).toString() : year && year.toString());
/**
 * @param {string | number} dateStr
 * @returns {string} date formatted as `yyyy-MM-dd`, returns `Invalid date` if can't parse input
 * Accepted date strings:
 *  - MM/dd/yyyy
 *  - MM dd yyyy
 *  - MM-dd-yy
 *  - MM/dd/yy
 *  - MM dd yy
 *  - yyyy-MM-dd
 *  - yyyy/MM/dd
 *  - yyyy MM dd
 *
 * Not accepted:
 *  - yy-MM-dd
 *  - yy/MM/dd
 *  - yy MM dd
 */
const formatDate = (dateStr) => moment(isDate(dateStr) || isString(dateStr) ? dateStr : Number(dateStr)).format('YYYY-MM-DD');

/**
 * @param {string | number} dateStr
 * @returns date formatted as `yyyy-MM-dd`
 *
 * @deprecated this function is the same as `formatDate`
 */
const formatTimestamp = (dateStr) => moment(isDate(dateStr) || isString(dateStr) ? dateStr : Number(dateStr)).format('YYYY-MM-DD');

/**
 * @param {string | number | Date} date as a date string, epoch time or Date object
 * @param {number} day number of days to add
 * @returns in the format `yyyy-MM-dd`
 *
 * Accepted date strings:
 *  - MM/dd/yyyy
 *  - MM dd yyyy
 *  - MM-dd-yy
 *  - MM/dd/yy
 *  - MM dd yy
 *  - yyyy-MM-dd
 *  - yyyy/MM/dd
 *  - yyyy MM dd
 *
 */
// This function is never actually used
const addDay = (date, day) => moment(date).add({ day }).format('YYYY-MM-DD');
/**
 * @param {string | number | Date} date as a date string, epoch time or Date object
 * @param {number} day number of months to add
 * @returns in the format `yyyy-MM-dd`.
 * Rounds down the date if target month is too short (e.g. 2024-01-31 plus 1 month is 2024-02-29)
 *
 * Accepted date strings:
 *  - MM/dd/yyyy
 *  - MM dd yyyy
 *  - MM-dd-yy
 *  - MM/dd/yy
 *  - MM dd yy
 *  - yyyy-MM-dd
 *  - yyyy/MM/dd
 *  - yyyy MM dd
 */
const addMonth = (date, months) => moment(date).add({ months }).format('YYYY-MM-DD');
/**
 * @param {string | number | Date} date as a date string, epoch time or Date object
 * @param {number} day number of months to add
 * @returns in the format `yyyy-MM-dd`.
 * Rounds down the date if target month is too short (e.g. 2024-02-29 plus 1 year is 2025-02-28)
 *
 * Accepted date strings:
 *  - MM/dd/yyyy
 *  - MM dd yyyy
 *  - MM-dd-yy
 *  - MM/dd/yy
 *  - MM dd yy
 *  - yyyy-MM-dd
 *  - yyyy/MM/dd
 *  - yyyy MM dd
 */
const addYear = (date, years) => moment(date).add({ years }).format('YYYY-MM-DD');

/**
 * @returns {string} current date as ISO-8601 string without milliseconds & with UTC offset (e.g. 2024-02-16T16:57:23+00:00)
 */
const getNowAsIsoString = () => moment().format();

/**
 * @param {string | Date | number | null} startDate
 * @param {string | Date | number | null} endDate
 * @returns {number} difference in months between dates, rounded up
 * The start date should be before the end date for this to have any meaning
 *
 * Accepted date strings:
 *  - MM/dd/yyyy
 *  - MM dd yyyy
 *  - MM-dd-yy
 *  - MM/dd/yy
 *  - MM dd yy
 *  - yyyy-MM-dd
 *  - yyyy/MM/dd
 *  - yyyy MM dd
 */
const getInclusiveMonthDifference = (startDate, endDate) => {
  const monthDifference = moment(endDate).diff(moment(startDate), 'months');
  const isSameDayOfMonth = moment(startDate).date() === moment(endDate).date();
  return isSameDayOfMonth ? monthDifference : monthDifference + 1;
};

/**
 * @param {string | number} day day of the month
 * @param {string | number} month 1 indexed month of the year
 * @param {string | number} year
 * @returns {string} formatted as `yyyy-MM-dd`
 */
const getDateStringFromYearMonthDay = (year, month, day) => moment([
  Number(formatYear(year)),
  Number(month) - 1,
  Number(day),
]).format('YYYY-MM-DD');

module.exports = {
  isDate,
  isEpoch,
  isString,
  now,
  formatDate,
  formatTimestamp,
  formatYear,
  addDay,
  addMonth,
  addYear,
  getNowAsIsoString,
  getInclusiveMonthDifference,
  getDateStringFromYearMonthDay,
};
