"use client"

import PostToLeadboardForm, { PostToLeadboardFormType } from "@/components/forms/PostToLeaderboardForm"
import DropdownWrapper, { SimpleDropdownItemType } from "@/components/wrappers/DropdownWrapper"
import { LOCATION_DETAILS } from "@/constants/controller-navigation.constants"
import { localService } from "@/services/local-service"
import Services from "@/services/services"
import { PublicLeaderboardType } from "@/types/public-leaderboard.type"
import { useDisclosure } from "@nextui-org/modal"
import { FormikState } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Key, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { TbWorldUpload, TbWorldX } from "react-icons/tb"
import { VscArrowLeft, VscEdit, VscTrash } from "react-icons/vsc"

const uploadPost: SimpleDropdownItemType = {
  display: "Post",
  props: {
    key: 'post',
    description: 'Uploads this location to the public leaderboard',
    startContent: <TbWorldUpload className="w-6 h-6" />
  }
}

const removePost: SimpleDropdownItemType = {
  display: "Remove Post",
  props: {
    key: 'remove-post',
    description: 'Removes the location from the public leaderboard. This does not delete the location.',
    startContent: <TbWorldX className="text-red-600 w-6 h-6" />
  }
}

type Props = {
  locationId: string
  publicPost: PublicLeaderboardType | null;
}
const LocationHeader = ({locationId, publicPost: defaultPublicPost}: Props) => {
  const router = useRouter();
  const modal = useDisclosure();
  const [publicPost, setPublicPost] = useState<PublicLeaderboardType | null>(defaultPublicPost);

  const locationMenuItems: SimpleDropdownItemType[] = [
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

  if (publicPost) 
    locationMenuItems.splice(0, 0, removePost);
  else
    locationMenuItems.splice(0, 0, uploadPost);

  const handleDropDownMenuAction = async (key: Key): Promise<void> => {
    switch (key) {
      case "edit":
        router.push(`${LOCATION_DETAILS}/save/${locationId}`)
        break;
      case "post":
        modal.onOpen();
        break;
      case "delete":
        console.error("Not yet implemented");
        break;
      case "remove-post":
        const res = await Services.deletePostFromPublicLeaderboard(locationId);
        if (res.ok)
          setPublicPost(null);
      default:
        break;
    }
  }

  const onSubmitPostToLeaderboard = async (
    values: PostToLeadboardFormType, 
    setSubmitting: (isSubmitting: boolean) => void, 
    resetForm: (nextState?: Partial<FormikState<PostToLeadboardFormType>> | undefined) => void
  ) => {
    const location = localService.getLocation(locationId);
    if (!location)
      return;

    const res = await Services.postToLeaderboard({location, name: values.name});
    if (res.ok) {
      const post = await res.json() as PublicLeaderboardType;
      setPublicPost(post);
    }
    setSubmitting(false);
    resetForm();
  }

  return (
    <>
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

      <PostToLeadboardForm 
        modal={modal}
        onSubmitForm={onSubmitPostToLeaderboard}
      />
    </>
  )
}

export default LocationHeader;
