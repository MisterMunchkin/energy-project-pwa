import {
  LOCATION_DETAILS,
  PUBLIC_LEADERBOARD,
} from "@/constants/controller-navigation.constants";
import { ReactNode } from "react";
import { FaEarthOceania } from "react-icons/fa6";
import { VscAdd, VscHome } from "react-icons/vsc";

type NavOption = {
  content: (className: string) => ReactNode;
  href: string;
};

/**
 * tab items to be rendered on the bottomTabBar
 *
 * @returns {NavOption[]} NavOptions that have the content ro render and the href string
 */
export const bottomTabOptions: NavOption[] = [
  {
    content: (className: string) => (
      <VscHome className={`${className}  w-16 h-full`} />
    ),
    href: "/",
  },
  {
    content: (className: string) => (
      <VscAdd className={`${className}  w-16 h-full`} />
    ),
    href: `${LOCATION_DETAILS}/save`,
  },
  {
    content: (className: string) => (
      <FaEarthOceania className={`${className}  w-14 h-full`} />
    ),
    href: `${PUBLIC_LEADERBOARD}`,
  },
];
