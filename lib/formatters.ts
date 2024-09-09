/**
 * Gets the ordinal of a given number.
 * @example getOrdinal(123) returns "123rd"
 * 
 * @param {number} n number to get the ordinal
 */
export const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}