import { ReactNode } from "react";
import { FaEarthOceania } from "react-icons/fa6";
import { VscAdd, VscHome } from "react-icons/vsc";

type NavOption = {
  content: (className: string) => ReactNode;
  href: string;
}

export const bottomTabOptions: NavOption[] = [
  {
    content: (className: string) => <VscHome className={`${className}  w-16 h-full`} />,
    href: '/'
  },
  {
    content: (className: string) => <VscAdd className={`${className}  w-16 h-full`} />,
    href: '/'
  },
  {
    content: (className: string) => <FaEarthOceania className={`${className}  w-14 h-full`} />,
    href: '/'
  }
];