import { COMPANY_REGISTRATION_NUMBER, MAX_PAYMENT_REFERENCE_CHARACTER_COUNT } from '../constants';
import { isNonEmptyString, isString } from './string';

/**
 * @param value - the value to check
 * @param context - provides context in the error message if value is not a string. Usually would be the name
 *  of the variable being passed in
 */
export const asString = (value: unknown, context: string): string => {
  if (!isString(value)) {
    throw new Error(`Expected ${context} to be a string, but was ${typeof value}`);
  }

  /**
   * Ensure return is `String` primitive type and
   * not `unknown`.
   */
  return String(value);
};

/**
 * @param {RegExp} regex The regular expression to test the input against.
 * @param {string} inputToTest The input to test against the provided regular expression.
 * @returns {boolean} True if the input matches the regular expression, false if it does not.
 */
export const matchesRegex = (regex: RegExp, inputToTest: string): boolean => regex.test(inputToTest);

/**
 * @param {string} registrationNumber The registration number to test against the regular expression for company registration numbers.
 * @returns {boolean} True if the registration number provided matches the regular expression for company registration numbers, false if it does not.
 */
export const isValidCompanyRegistrationNumber = (registrationNumber: string): boolean =>
  matchesRegex(COMPANY_REGISTRATION_NUMBER.REGEX, registrationNumber.toString());

/**
 * Checks if the payment reference exceeds
 * {@link MAX_PAYMENT_REFERENCE_CHARACTER_COUNT} characters.
 * @param paymentReference - The payment reference to check.
 * @returns True if the payment reference is a non-empty string and longer than the maximum character count, false otherwise.
 */
export const isPaymentReferenceOverMaxCharacterCount = (paymentReference: string | undefined): boolean => {
  return isNonEmptyString(paymentReference) && paymentReference.length > MAX_PAYMENT_REFERENCE_CHARACTER_COUNT;
};
