"use client"

import DropdownWrapper, { SimpleDropdownItemType } from "@/components/wrappers/DropdownWrapper"
import { LOCATION_DETAILS } from "@/constants/controller-navigation.constants"
import { localService } from "@/services/local-service"
import Services from "@/services/services"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  const router = useRouter();
  function handleDropDownMenuAction(key: Key): void {
    switch (key) {
      case "edit":
        router.push(`${LOCATION_DETAILS}/save/${locationId}`)
        break;
      case "post":
        const location = localService.getLocation(locationId);
        location && Services.postToLeaderboard(location)
        break;
      case "delete":
        console.error("Not yet implemented");
        break;
      default:
        break;
    }
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