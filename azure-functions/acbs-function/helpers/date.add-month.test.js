const { format } = require('date-fns');
const { addMonth } = require('./date');
const { validDateFormats, invalidDateFormats } = require('../test-helpers/date-formats');

describe('addMonth', () => {
  const testDate = new Date('2024-05-12');
  const testDatePlusOneMonthFormatted = '2024-06-12';

  const validTestData = validDateFormats.map((formatString) => ({
    description: `parses date formatted as ${formatString} and adds months correctly`,
    formatString,
    date: format(testDate, formatString),
    monthsToAdd: 1,
    expected: testDatePlusOneMonthFormatted,
  }));

  const invalidTestData = invalidDateFormats.map((formatString) => ({
    description: `does not parse a date formatted as ${formatString}`,
    formatString,
    date: format(testDate, formatString),
    monthsToAdd: 1,
    expected: 'Invalid date',
  }));

  const testData = [
    ...validTestData,
    ...invalidTestData,
    {
      description: 'parses Date object',
      date: testDate,
      monthsToAdd: 1,
      expected: testDatePlusOneMonthFormatted,
    },
    {
      description: 'parses epoch stored as number',
      date: testDate.valueOf(),
      monthsToAdd: 1,
      expected: testDatePlusOneMonthFormatted,
    },
    {
      description: 'does not parse epoch as a string',
      date: testDate.valueOf().toString(),
      monthsToAdd: 1,
      expected: 'Invalid date',
    },
    {
      description: 'adds 12 months and returns the next year',
      date: '2024-12-01',
      monthsToAdd: 12,
      expected: '2025-12-01',
    },
    {
      description: 'rounds down date if next month is too small',
      date: '2024-01-31',
      monthsToAdd: 1,
      expected: '2024-02-29',
    },
    {
      description: 'accepts months to add as string',
      date: format(testDate, 'yyyy-MM-dd'),
      monthsToAdd: '1',
      expected: testDatePlusOneMonthFormatted,
    },
    {
      description: 'adds 0 months if months to add is string with no numbers',
      date: format(testDate, 'yyyy-MM-dd'),
      monthsToAdd: 'x',
      expected: format(testDate, 'yyyy-MM-dd'),
    },
    {
      description: 'adds 0 months if months to add is empty object',
      date: format(testDate, 'yyyy-MM-dd'),
      monthsToAdd: {},
      expected: format(testDate, 'yyyy-MM-dd'),
    },
    {
      description: 'adds 0 months if months to add is invalid string containing numbers',
      date: format(testDate, 'yyyy-MM-dd'),
      monthsToAdd: '12x1',
      expected: format(testDate, 'yyyy-MM-dd'),
    },
    {
      description: 'adds 1 month if months to add is true',
      date: format(testDate, 'yyyy-MM-dd'),
      monthsToAdd: true,
      expected: testDatePlusOneMonthFormatted,
    },
  ];

  it.each(testData)('$description ($date plus $monthsToAdd month(s) gives $expected)', ({ date, monthsToAdd, expected }) => {
    const result = addMonth(date, monthsToAdd);

    expect(result).toEqual(expected);
  });
});
