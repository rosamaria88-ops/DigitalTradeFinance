import { isSameDay } from 'date-fns';
import { assertValidIsoMonth, getBusinessDayOfMonth, getIsoMonth, getOneIndexedMonth } from './date';

describe('date', () => {
  describe('getBusinessDayOfMonth', () => {
    it.each([
      { businessDay: 0, testCase: 'less than 1' },
      { businessDay: 1.5, testCase: 'not an integer' },
      { businessDay: '1', testCase: 'not a number' },
    ])('throws when businessDay is $testCase', ({ businessDay }) => {
      // Arrange
      const dateInMonth = new Date('2023-01-01');
      const holidays = [];

      // Act / Assert
      expect(() => getBusinessDayOfMonth(dateInMonth, holidays, businessDay)).toThrow(
        new Error(`businessDay must be a positive integer. Found ${businessDay}`),
      );
    });

    describe('when there are no holidays', () => {
      const holidays = [];

      describe('when the first of the month is not a weekend date', () => {
        const dateInMonth = new Date('2023-11-15');

        it.each([
          { businessDay: 1, expectedResult: new Date('2023-11-01') },
          { businessDay: 2, expectedResult: new Date('2023-11-02') },
          { businessDay: 3, expectedResult: new Date('2023-11-03') },
          //                                         '2023-11-04' - Saturday
          //                                         '2023-11-05' - Sunday
          { businessDay: 4, expectedResult: new Date('2023-11-06') },
          { businessDay: 5, expectedResult: new Date('2023-11-07') },
          { businessDay: 6, expectedResult: new Date('2023-11-08') },
          { businessDay: 7, expectedResult: new Date('2023-11-09') },
          { businessDay: 8, expectedResult: new Date('2023-11-10') },
          //                                         '2023-11-11' - Saturday
          //                                         '2023-11-12' - Sunday
          { businessDay: 9, expectedResult: new Date('2023-11-13') },
        ])(`returns $expectedResult when dateInMonth is ${dateInMonth.toISOString()} and businessDay is $businessDay`, ({ businessDay, expectedResult }) => {
          // Act
          const result = getBusinessDayOfMonth(dateInMonth, holidays, businessDay);

          // Assert
          expect(isSameDay(result, expectedResult)).toBe(true);
        });
      });

      describe('when the first of the month is a weekend date', () => {
        const dateInMonth = new Date('2023-10-15');

        it.each([
          //                                               '2023-10-01' - Sunday
          { businessDay: 1, expectedResult: new Date('2023-10-02') },
          { businessDay: 2, expectedResult: new Date('2023-10-03') },
        ])(`returns $expectedResult when dateInMonth is ${dateInMonth.toISOString()} and businessDay is $businessDay`, ({ businessDay, expectedResult }) => {
          // Act
          const result = getBusinessDayOfMonth(dateInMonth, holidays, businessDay);

          // Assert
          expect(isSameDay(result, expectedResult)).toBe(true);
        });
      });
    });

    describe('when there are holidays', () => {
      it('takes into account consecutive holidays', () => {
        // Arrange
        const dateInMonth = new Date('2023-08-15');
        const holidays = [
          new Date('2023-08-02'), // Wednesday
          new Date('2023-08-03'), // Thursday
        ];
        const businessDay = 2; // would expect '2023-08-02' without holidays
        const expectedResult = new Date('2023-08-04');

        // Act
        const result = getBusinessDayOfMonth(dateInMonth, holidays, businessDay);

        // Assert
        expect(isSameDay(result, expectedResult)).toBe(true);
      });

      it('takes into account both holidays and weekend dates', () => {
        // Arrange
        const dateInMonth = new Date('2023-11-15');
        const holidays = [
          new Date('2023-11-03'), // Friday
          new Date('2023-11-06'), // Monday
        ];
        const businessDay = 3; // would expect '2023-11-03' without holidays
        const expectedResult = new Date('2023-11-07');

        // Act
        const result = getBusinessDayOfMonth(dateInMonth, holidays, businessDay);

        // Assert
        expect(isSameDay(result, expectedResult)).toBe(true);
      });
    });
  });

  describe('getOneIndexedMonth', () => {
    it.each([
      { date: new Date(2023, 0), expectedOneIndexMonth: 1 },
      { date: new Date(2023, 1), expectedOneIndexMonth: 2 },
      { date: new Date(2023, 2), expectedOneIndexMonth: 3 },
      { date: new Date(2023, 3), expectedOneIndexMonth: 4 },
      { date: new Date(2023, 4), expectedOneIndexMonth: 5 },
      { date: new Date(2023, 5), expectedOneIndexMonth: 6 },
      { date: new Date(2023, 6), expectedOneIndexMonth: 7 },
      { date: new Date(2023, 7), expectedOneIndexMonth: 8 },
      { date: new Date(2023, 8), expectedOneIndexMonth: 9 },
      { date: new Date(2023, 9), expectedOneIndexMonth: 10 },
      { date: new Date(2023, 10), expectedOneIndexMonth: 11 },
      { date: new Date(2023, 11), expectedOneIndexMonth: 12 },
    ])('should return $expectedOneIndexMonth when the date is', ({ date, expectedOneIndexMonth }) => {
      expect(getOneIndexedMonth(date)).toEqual(expectedOneIndexMonth);
    });
  });

  describe('getIsoMonth', () => {
    it.each(['2023-13', 202311, undefined, null, ['2023-11'], { date: '2023-11' }])('throws when provided with %p instead of an instance of Date', (value) => {
      expect(() => getIsoMonth(value)).toThrowError("Expected an instance of 'Date'");
    });

    it.each([
      { dateInMonth: new Date(2023, 7), expectedIsoMonth: '2023-08' },
      { dateInMonth: new Date('1980-02-28'), expectedIsoMonth: '1980-02' },
    ])("returns ISO month '$expectedIsoMonth' when provided with Date $dateInMonth", ({ dateInMonth, expectedIsoMonth }) => {
      expect(getIsoMonth(dateInMonth)).toEqual(expectedIsoMonth);
    });
  });

  describe('assertValidIsoMonth', () => {
    it.each(['2023-11-01', '2023-13', '202-11', 'invalid', '', 202311, undefined, null, ['2023-11'], { date: '2023-11' }])(
      'throws when provided non-ISO month string value %p',
      (value) => {
        expect(() => assertValidIsoMonth(value)).toThrowError('Invalid ISO mont');
      },
    );

    it('returns when provided with a valid ISO month string', () => {
      expect(() => assertValidIsoMonth('2023-11')).not.toThrow();
    });
  });
});
