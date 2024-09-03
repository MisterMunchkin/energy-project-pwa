"use client"

import DropdownWrapper, { SimpleDropdownItemType } from "@/components/wrappers/DropdownWrapper"
import Link from "next/link"
import { Key } from "react"
import { BsThreeDots } from "react-icons/bs"
import { TbWorldUpload } from "react-icons/tb"
import { VscArrowLeft, VscEdit, VscTrash } from "react-icons/vsc"

const locationMenuItems: SimpleDropdownItemType[] = [
  {
    display: "Post",
    props: {
      key: 'post',
      description: 'Uploads this location to the public leaderboard',
      startContent: <TbWorldUpload className="w-6 h-6" />
    }
  },
  {
    display: "Edit",
    props: {
      key: 'edit',
      startContent: <VscEdit className="w-6 h-6" />
    }
  },
  {
    display: "Delete",
    props: {
      key: 'delete',
      description: "Also removes location from the public leaderboard",
      startContent: <VscTrash className="text-red-600 w-6 h-6" />,
      className: "text-red-600"
    }
  }
];

type Props = {
  locationId: string
}
const LocationHeader = ({locationId}: Props) => {
  function handleDropDownMenuAction(key: Key): void {
    console.log(key)
  }

  return (
    <div className="p-2 flex flex-row justify-between items-center">
      <Link
        className="cursor-pointer"
        href='/'
      >
        <VscArrowLeft
          className="text-epp-indigo w-10 h-10"
        />
      </Link>
      <DropdownWrapper 
        trigger={(
          <button
            type="button"
          >
            <BsThreeDots className="w-10 h-10 text-epp-indigo" />
          </button>
        )}
        ariaLabel="Location Menu"
        simpleMenuItems={locationMenuItems}
        onAction={handleDropDownMenuAction}
      />
    </div>
  )
}

export default LocationHeader;