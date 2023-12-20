const {
  isString,
  isEmptyString,
  hasValue,
  containsNumber,
} = require('./string');

describe('helpers - string', () => {
  describe('isString', () => {
    it.each`
      value                                 | expected
      ${1}                                  | ${false}
      ${true}                               | ${false}
      ${null}                               | ${false}
      ${undefined}                          | ${false}
      ${['a string in an array']}           | ${false}
      ${{ value: 'a string in an object' }} | ${false}
      ${''}                                 | ${true}
      ${'a string'}                         | ${true}
    `('returns $expected when the value is $value', ({ value, expected }) => {
      // Act
      const result = isString(value);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('isEmptyString', () => {
    it('should return true when string is empty or is pure whitespace', () => {
      expect(isEmptyString('')).toEqual(true);
      expect(isEmptyString(' ')).toEqual(true);
      expect(isEmptyString('   ')).toEqual(true);
    });

    it('should return false when param is a string', () => {
      expect(isEmptyString('a')).toEqual(false);
    });
  });

  describe('hasValue', () => {
    it('should return true when a string is passed', () => {
      expect(hasValue('test')).toEqual(true);
    });

    it('should return false when there is no value passed or is empty/whitespace', () => {
      expect(hasValue()).toEqual(false);
      expect(hasValue(null)).toEqual(false);
      expect(hasValue('')).toEqual(false);
      expect(hasValue(' ')).toEqual(false);
    });
  });

  describe('containsNumber', () => {
    it('should return true when string contains a number', () => {
      const result = containsNumber('asdf1asdf');
      expect(result).toEqual(true);
    });

    it('should return false wen string does NOT contain a number', () => {
      const result = containsNumber('mock');
      expect(result).toEqual(false);
    });
  });
});
