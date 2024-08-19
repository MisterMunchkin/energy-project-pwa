'use client'

import Link from "next/link";
import { bottomTabOptions } from "./navigation-options.config";
import { useState } from "react";

type Props = {}
const BottomTabBar = () => {
  const [ activeTab, setActiveTab ] = useState<number>(0);  

  return (
    <div 
      className="flex flex-row justify-evenly w-full h-[50px] fixed bottom-0 left-0 border-t-2 bg-epp-white"
    >
      {bottomTabOptions.map((option, index) => (
        <Link
          key={index}
          href={option.href}
          onClick={() => setActiveTab(index)}
        >
          {option.content(`px-4 ${(activeTab === index ? 'text-epp-orange' : 'text-gray-800')}`)}
        </Link>
      ))}
    </div>
  )
}

export default BottomTabBar;