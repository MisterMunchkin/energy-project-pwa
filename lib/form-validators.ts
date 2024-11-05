/**
 * Regexpressions used for validations
 *
 * export const is to make it accessible within the Regex namespace.
 * Regex is private and only used within this file.
 */
namespace Regex {
  export const only4Digits = new RegExp("^[0-9]{4}$");
  export const hoursInADay = new RegExp("^(2[0-4]|1[0-9]|[1-9])$");
  export const wholeNumbers = new RegExp("^[1-9][0-9]*$");
  export const textAndNumOnly = new RegExp("^[A-Za-z0-9\\s]+$");
}

/**
 * validates streetAddress strings.
 * @param {string} value streetAddress value to validate
 * @returns {string} string of error messages, if no errors, undefined
 */
const _streetAddress = (value: string): string | undefined => {
  if (!value) return "Required!";
  if (value.length > 100) return "Too Long!";
  if (!Regex.textAndNumOnly.test(value))
    return "Only numbers and letters are allowed";

  return;
};

/**
 * validates city strings
 * @param {string} value city value to validates
 * @returns {string} string of error messages, if no errors, undefined
 */
const _city = (value: string): string | undefined => {
  if (!value) return "Required!";
  if (value.length > 30) return "Too Long!";
  if (!Regex.textAndNumOnly.test(value))
    return "Only numbers and letters are allowed";

  return;
};

/**
 * Validates postal code strings.
 * @param {string} value Postal code value to validate
 * @returns {string} String of error message if invalid; otherwise, undefined
 */
const _postalCode = (value: string): string | undefined => {
  if (!value) return "Required!";
  if (!Regex.only4Digits.test(value)) return "Needs to be only 4 digits!";

  return;
};

/**
 * Validates hours per day strings.
 * @param {string} value Hours per day value to validate
 * @returns {string} String of error message if invalid; otherwise, undefined
 */
const _hoursPerDay = (value: string): string | undefined => {
  if (!value) return "Required!";
  if (!Regex.hoursInADay.test(value))
    return "Should be the amount of hours in a day! (1 - 24)";

  return;
};

/**
 * Validates quantity strings.
 * @param {string} value Quantity value to validate
 * @returns {string} String of error message if invalid; otherwise, undefined
 */
const _quantity = (value: string): string | undefined => {
  if (!value) return "Required!";
  if (!Regex.wholeNumbers.test(value))
    return "Should be a whole number greater than zero!";

  return;
};

/**
 * Validates leaderboard post name strings.
 * @param {string} value Leaderboard post name to validate
 * @returns {string} String of error message if invalid; otherwise, undefined
 */
const _leadboardPostName = (value: string): string | undefined => {
  if (!value) return "Required!";
  if (value.length > 30) return "Maximum of 30 characters!";
  if (!Regex.textAndNumOnly.test(value))
    return "Only numbers and letters are allowed";

  return;
};

namespace Validators {
  export const streetAddress = _streetAddress;
  export const city = _city;
  export const postalCode = _postalCode;
  export const hoursPerDay = _hoursPerDay;
  export const quantity = _quantity;
  export const leaderboardPostName = _leadboardPostName;
}

/**
 * To Validated different form fields.
 */
export default Validators;
