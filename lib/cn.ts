import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This is so that tailwind classNames are merged without style conflicts.
 * A powerfull piece of code that allows tailwind conditional logic without the need for
 * string manipulation. Makes writing conditional or dynamic styles in tailwind smooth like butter.
 *
 * @example  <span
                className={cn(
                  energyType === "Wind" && "text-epp-indigo/50",
                  energyType === "Solar" && "text-epp-orange/50",
                  energyType === "Gas" && "text-epp-spring-green",
                  energyType === "Coal" && "text-light-red/50",
                )}
              >
 * 
 *  - PublicPost.tsx line 79
 *
 * 
 * This util function also works harmonously with clsx.ts
 * 
 * @param {ClassValue[]} inputs multiple arguments of ClassValue types.
 * @returns {string} returns the merged string for tailwind utility classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
