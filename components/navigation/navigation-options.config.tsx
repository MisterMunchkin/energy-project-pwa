import { ReactNode } from "react";

type NavOption = {
  content: ReactNode;
  href: string;
}

export const navOptions: NavOption[] = [
  {
    content: <span className="px-4">Home</span>,
    href: '/'
  },
  {
    content: <span className="px-4">Add</span>,
    href: '/'
  },
  {
    content: <span className="px-4">Public</span>,
    href: '/'
  }
];