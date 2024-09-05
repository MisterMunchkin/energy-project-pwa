namespace Regex {
  export const only4Digits = new RegExp('^[0-9]{4}$');
  export const hoursInADay = new RegExp('^(2[0-4]|1[0-9]|[1-9])$');
  export const wholeNumbers = new RegExp('^[1-9][0-9]*$');
}

const _streetAddress = (value: string): string | undefined => {
  if (!value)
    return 'Required!';
  if (value.length > 100)
    return 'Too Long!';

  return;
}

const _city = (value: string): string | undefined => {
  if (!value)
    return 'Required!';
  if (value.length > 30)
    return 'Too Long!';

  return;
}

const _postalCode = (value: string): string | undefined => {
  if (!value)
    return 'Required!';
  if (!Regex.only4Digits.test(value))
    return 'Needs to be only 4 digits!'

  return;
}

const _hoursPerDay = (value: string): string | undefined => {
  if (!value)
    return 'Required!';
  if (!Regex.hoursInADay.test(value))
    return 'Should be the amount of hours in a day! (1 - 24)';

  return;
}

const _quantity = (value: string): string | undefined => {
  if (!value)
    return 'Required!';
  if (!Regex.wholeNumbers.test(value))
    return 'Should be a whole number greater than zero!';

  return;
}

const _leadboardPostName = (value: string): string | undefined => {
  if (!value) 
    return 'Required!';
  if (value.length > 30)
    return 'Maximum of 30 characters!';

  return;
}

namespace Validators {
  export const streetAddress = _streetAddress;
  export const city = _city;
  export const postalCode = _postalCode;
  export const hoursPerDay = _hoursPerDay;
  export const quantity = _quantity;
  export const leaderboardPostName = _leadboardPostName;
}

export default Validators;