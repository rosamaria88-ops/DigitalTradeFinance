const amendmentYearValidation = require('./amendmentYearValidation.validate');

describe('amendmentYearValidation()', () => {
  it('should return true when year is 2 numbers long', () => {
    const year = '22';
    const result = amendmentYearValidation(year);

    expect(result).toEqual(true);
  });

  it('should return true when year is 1 number long', () => {
    const year = '2';
    const result = amendmentYearValidation(year);

    expect(result).toEqual(true);
  });

  it('should return true when year is 3 numbers long', () => {
    const year = '202';
    const result = amendmentYearValidation(year);

    expect(result).toEqual(true);
  });

  it('should return true when year includes a letter', () => {
    const year = '2O22';
    const result = amendmentYearValidation(year);

    expect(result).toEqual(true);
  });

  it('should return true when year is a blank string', () => {
    const year = '';
    const result = amendmentYearValidation(year);

    expect(result).toEqual(true);
  });

  it('should return true when year is a space', () => {
    const year = ' ';
    const result = amendmentYearValidation(year);

    expect(result).toEqual(true);
  });

  it('should return true when year is null', () => {
    const year = null;
    const result = amendmentYearValidation(year);

    expect(result).toEqual(true);
  });

  it('should return false when year is 4 numbers', () => {
    const year = '2022';
    const result = amendmentYearValidation(year);

    expect(result).toEqual(false);
  });
});
