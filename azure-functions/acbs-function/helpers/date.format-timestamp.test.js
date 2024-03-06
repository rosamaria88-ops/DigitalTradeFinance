const { format } = require('date-fns');
const { formatTimestamp } = require('./date');
const { validDateFormats, invalidDateFormats } = require('../test-helpers/date-formats');

describe('formatTimestamp', () => {
  const date = new Date();

  const invalidStringTestCases = invalidDateFormats.map((formatString) => ({
    description: `should not parse a date in the format '${formatString}'`,
    mockValue: format(date, formatString),
    expected: 'Invalid date',
  }));

  const validStringTestCases = validDateFormats.map((formatString) => ({
    description: `should parse the date correctly when input is formatted as '${formatString}'`,
    mockValue: format(date, formatString),
    expected: format(date, 'yyyy-MM-dd'),
  }));

  const testData = [
    ...invalidStringTestCases,
    ...validStringTestCases,
    {
      description: 'should not parse if day of month too big',
      mockValue: '2023-10-32',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse if day of month too big',
      mockValue: '2023-11-31',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse if day of month too big',
      mockValue: '2024-02-30',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse if day of month too big',
      mockValue: '2023-02-29',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse if month too big',
      mockValue: '2023-13-12',
      expected: 'Invalid date',
    },
    {
      description: 'should parse the js maximum date',
      mockValue: '275760-09-13',
      expected: '275760-09-13',
    },
    {
      description: 'should not parse a date after the js maximum date',
      mockValue: '275760-09-14',
      expected: 'Invalid date',
    },
    {
      description: 'should parse js maximum epoch',
      mockValue: 8640000000000000,
      expected: '275760-09-13',
    },
    {
      description: 'should not parse a number bigger than maximum date',
      mockValue: 8640000000000001,
      expected: 'Invalid date',
    },
    {
      description: 'should parse the js maximum epoch stored as a string',
      mockValue: '8640000000000000',
      expected: '275760-09-13',
    },
    {
      description: 'should not parse a number bigger than maximum epoch stored as a string',
      mockValue: '8640000000000001',
      expected: 'Invalid date',
    },
    {
      description: 'should parse `0` as epoch',
      mockValue: '0',
      expected: '1970-01-01',
    },
    {
      description: 'should parse 0 as epoch',
      mockValue: 0,
      expected: '1970-01-01',
    },
    {
      description: 'should parse negative integer stored as string as epoch',
      mockValue: '-1708955777575',
      expected: '1915-11-06',
    },
    {
      description: 'should not parse positive float stored as a string',
      mockValue: '170895577.7575',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse a string written in scientific notation',
      mockValue: '5e5',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse an epoch followed by non-numeric characters',
      mockValue: '1708955777575##',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse empty string',
      mockValue: '',
      expected: 'Invalid date',
    },
    {
      description: 'should not parse only letters',
      mockValue: 'test',
      expected: 'Invalid date',
    },
  ];

  it.each(testData)('$description ($mockValue to $expected)', ({ mockValue, expected }) => {
    const result = formatTimestamp(mockValue);

    expect(result).toBe(expected);
  });
});
