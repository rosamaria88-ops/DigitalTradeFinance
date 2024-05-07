import { getOneIndexedMonth, isValidIsoMonth, toIsoMonthStamp } from './date';

describe('date utils', () => {
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

  describe('isValidIsoMonth', () => {
    it.each([
      '2023-11-01',
      '2023-13',
      '202-11',
      'invalid',
      '',
      202311,
      undefined,
      null,
      ['2023-11'],
      { date: '2023-11' },
    ])('returns false when the value is %p', (value) => {
      expect(isValidIsoMonth(value)).toBe(false);
    });

    it('returns true when a valid ISO month value is provided', () => {
      expect(isValidIsoMonth('2023-11')).toBe(true);
    });
  });

  describe('toIsoMonthStamp', () => {
    it.each([
      { date: new Date(2024, 1), expectedIsoMonthStamp: '2024-02' },
      { date: new Date(2024, 1, 29), expectedIsoMonthStamp: '2024-02' },
      { date: new Date('2023-03'), expectedIsoMonthStamp: '2023-03' },
      { date: new Date('2023-03-31'), expectedIsoMonthStamp: '2023-03' },
    ])(`converts Date object '$date' to IsoMonthStamp '$expectedIsoMonthStamp'`, ({ date, expectedIsoMonthStamp }) => {
      expect(toIsoMonthStamp(date)).toBe(expectedIsoMonthStamp);
    });
  });
});
