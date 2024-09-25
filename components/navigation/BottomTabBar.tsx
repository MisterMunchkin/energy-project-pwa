'use client'

import { useCallback } from "react";
import { bottomTabOptions } from "./navigation-options.config";
import { useRouter, useSearchParams } from "next/navigation";

const ACTIVE_TAB = 'activeTab';
const BottomTabBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get(ACTIVE_TAB) ?? '0';

  
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div 
      className="flex flex-row justify-evenly w-full h-[50px] fixed bottom-0 left-0 border-t-2 bg-epp-white"
    >
      {bottomTabOptions.map((option, index) => (
        <button
          key={index}
          // href={option.href}
          type="button"
          onClick={() => {

            router.push(`${option.href}?${createQueryString(ACTIVE_TAB, index.toString())}`);
          }}
        >
          {option.content(`px-4 ${(activeTab === index.toString() ? 'text-epp-orange' : 'text-gray-800')}`)}
        </button>
      ))}
    </div>
  )
}

export default BottomTabBar;