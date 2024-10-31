import { LocationType } from "@/types/location.type";

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
};

/**
 * formats address fields to a string. Since we only ever have addresses within
 * a LocationType, we can just strictly type the args to be LocationType without the appliances.
 *
 * In the even requirements changes and there may be a new type that holds address
 * data that needs to be formatted, we can change the type to something like:
 *
 * Record<{streetAddress: string, city: string, etc...}> or turn it into a generic func where T type extends {streetAddress: string, etc...}
 *
 * I personally favor Record because I think T type is too overpowered for something as simple as formatting address.
 *
 * as long as it has the required property, it should be allowed to use this method
 *
 * @param param0 address fields to format
 * @returns formatted string of address
 */
export const formatAddress = ({
  streetAddress,
  city,
  state,
  postalCode,
}: Omit<LocationType, "appliances">) => {
  return `${streetAddress}, ${city}, ${state} ${postalCode}`;
};
