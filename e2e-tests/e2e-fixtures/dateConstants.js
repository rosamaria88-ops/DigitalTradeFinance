import {
  sub, add, format, getUnixTime,
} from 'date-fns';

const today = new Date();
const todayDay = format(today, 'dd');
const todayMonth = format(today, 'M');
const todayYear = format(today, 'yyyy');
const todayTaskFormat = format(today, 'dd MMM yyyy');

// to test cannot be issued in past
const fourDaysAgo = sub(today, { days: 4 });
const fourDaysAgoDay = format(fourDaysAgo, 'dd');
const fourDaysAgoMonth = format(fourDaysAgo, 'M');
const fourDaysAgoYear = format(fourDaysAgo, 'yyyy');
const fourDaysAgoFull = format(fourDaysAgo, 'd MMMM yyyy');
const yesterday = sub(today, { days: 1 });
const oneMonth = add(today, { months: 1 });
const oneMonthFormattedFull = format(oneMonth, 'dd MMMM yyyy');
const oneMonthFormattedShort = format(oneMonth, 'dd MMM yyyy');
const oneMonthDay = format(oneMonth, 'dd');
const oneMonthMonth = format(oneMonth, 'M');
const oneMonthYear = format(oneMonth, 'yyyy');
const twoMonths = add(today, { months: 2 });
const twoMonthsDay = format(twoMonths, 'dd');
const twoMonthsMonth = format(twoMonths, 'M');
const twoMonthsYear = format(twoMonths, 'yyyy');
const twoMonthsFormatted = format(twoMonths, 'dd LLL yyyy');
const twoMonthsFormattedFull = format(twoMonths, 'dd MMMM yyyy');
const twoMonthsFormattedTable = format(twoMonths, 'd MMMM yyyy');
// to test that if beyond issue/ cover start date limit
const tomorrow = add(today, { days: 1 });
const tomorrowDay = format(tomorrow, 'dd');
const tomorrowMonth = format(tomorrow, 'M');
const tomorrowYear = format(tomorrow, 'yyyy');
const threeMonths = add(today, { months: 3 });
const threeMonthsDay = format(threeMonths, 'dd');
const threeMonthsMonth = format(threeMonths, 'M');
const threeMonthsYear = format(threeMonths, 'yyyy');
const threeMonthsOneDay = add(today, { months: 3, days: 1 });
const threeMonthsOneDayDay = format(threeMonthsOneDay, 'dd');
const threeMonthsOneDayMonth = format(threeMonthsOneDay, 'M');
const threeMonthsOneDayYear = format(threeMonthsOneDay, 'yyyy');
const twentyEight = add(today, { days: 28 });
const twentyEightDay = format(twentyEight, 'dd');
const twentyEightMonth = format(twentyEight, 'M');
const twentyEightYear = format(twentyEight, 'yyyy');

const threeDaysAgo = sub(today, { days: 3 });
const threeDaysAgoUnix = getUnixTime(threeDaysAgo).toString();
const threeDaysDay = format(threeDaysAgo, 'dd');
const threeDaysMonth = format(threeDaysAgo, 'M');
const threeDaysYear = format(threeDaysAgo, 'yyyy');

const twoYears = add(today, { years: 2, months: 3, days: 1 });
const twoYearsDay = format(twoYears, 'dd');
const twoYearsMonth = format(twoYears, 'M');
const twoYearsYear = format(twoYears, 'yyyy');

const oneYearAgo = sub(today, { years: 1 });
const oneYearUnix = getUnixTime(oneYearAgo).toString();
const oneYearAgoDay = format(oneYearAgo, 'dd');
const oneYearAgoMonth = format(oneYearAgo, 'M');
const oneYearAgoYear = format(oneYearAgo, 'yyyy');

const threeYears = add(today, { years: 3, months: 3, days: 1 });
const threeYearsDay = format(threeYears, 'dd');
const threeYearsMonth = format(threeYears, 'M');
const threeYearsYear = format(threeYears, 'yyyy');

const threeDaysAgoPlusMonth = add(threeDaysAgo, { months: 3 });

const todayUnix = getUnixTime(today).toString();
const todayUnixDay = format(threeDaysAgo, 'dd');
const todayUnixMonth = format(threeDaysAgo, 'M');
const todayUnixYear = format(threeDaysAgo, 'yyyy');

const todayFormattedFull = format(today, 'dd MMMM yyyy');
const todayFormatted = format(today, 'd MMMM yyyy');
const tomorrowFormattedFull = format(tomorrow, 'd MMMM yyyy');
const tomorrowFormattedFacilityPage = format(tomorrow, 'dd LLL yyyy');

const todayFormattedTimeHours = format(today, 'h');
const todayFormattedTimeAmPm = format(today, 'aaa');

export default {
  today,
  todayDay,
  todayMonth,
  todayYear,
  tomorrow,
  tomorrowDay,
  tomorrowMonth,
  tomorrowYear,
  yesterday,
  fourDaysAgo,
  fourDaysAgoDay,
  fourDaysAgoMonth,
  fourDaysAgoYear,
  fourDaysAgoFull,
  oneMonth,
  oneMonthFormattedFull,
  oneMonthFormattedShort,
  oneMonthDay,
  oneMonthMonth,
  oneMonthYear,
  twoMonths,
  twoMonthsDay,
  twoMonthsMonth,
  twoMonthsYear,
  twoMonthsFormatted,
  twoMonthsFormattedFull,
  twoMonthsFormattedTable,
  threeMonths,
  threeMonthsDay,
  threeMonthsMonth,
  threeMonthsYear,
  threeMonthsOneDay,
  threeMonthsOneDayDay,
  threeMonthsOneDayMonth,
  threeMonthsOneDayYear,
  twentyEight,
  twentyEightDay,
  twentyEightMonth,
  twentyEightYear,
  threeDaysAgo,
  threeDaysAgoUnix,
  threeDaysDay,
  threeDaysMonth,
  threeDaysYear,
  todayUnix,
  todayUnixDay,
  todayUnixMonth,
  todayUnixYear,
  threeDaysAgoPlusMonth,
  todayTaskFormat,
  todayFormattedFull,
  todayFormatted,
  tomorrowFormattedFull,
  tomorrowFormattedFacilityPage,
  todayFormattedTimeHours,
  todayFormattedTimeAmPm,
  twoYears,
  twoYearsDay,
  twoYearsMonth,
  twoYearsYear,
  threeYears,
  threeYearsDay,
  threeYearsMonth,
  threeYearsYear,
  oneYearAgo,
  oneYearUnix,
  oneYearAgoDay,
  oneYearAgoMonth,
  oneYearAgoYear,
};
