namespace Regex {
  export const only4Digits = new RegExp('^[0-9]{4}$');
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

namespace Validators {
  export const streetAddress = _streetAddress;
  export const city = _city;
  export const postalCode = _postalCode;
}

export default Validators;