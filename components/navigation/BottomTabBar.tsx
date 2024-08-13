import Link from "next/link";
import { bottomTabOptions } from "./navigation-options.config";

type Props = {}
const BottomTabBar = () => {
  return (
    <div 
      className="flex flex-row justify-evenly w-full p-4 fixed bottom-0 left-0 border-t-2 bg-epp-white"
    >
      {bottomTabOptions.map((option, index) => (
        <Link
          key={index}
          className="text-light-red"
          href={option.href}
        >
          {option.content}
        </Link>
      ))}
    </div>
  )
}

export default BottomTabBar;