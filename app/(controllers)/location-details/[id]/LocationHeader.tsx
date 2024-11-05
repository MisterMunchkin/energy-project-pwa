"use client";

import PostToLeadboardForm, {
  PostToLeadboardFormType,
} from "@/components/forms/PostToLeaderboardForm";
import DropdownWrapper, {
  SimpleDropdownItemType,
} from "@/components/wrappers/DropdownWrapper";
import { LOCATION_DETAILS } from "@/constants/controller-navigation.constants";
import { localService } from "@/services/local-service";
import { PublicLeaderboardService } from "@/services/services";
import { PublicLeaderboardType } from "@/types/public-leaderboard.type";
import { useDisclosure } from "@nextui-org/modal";
import { FormikState } from "formik";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import { TbWorldUpload, TbWorldX } from "react-icons/tb";
import { VscEdit, VscTrash } from "react-icons/vsc";

const uploadPost: SimpleDropdownItemType = {
  display: "Post",
  props: {
    key: "post",
    description: "Uploads this location to the public leaderboard",
    startContent: <TbWorldUpload className="w-6 h-6" />,
  },
};

const removePost: SimpleDropdownItemType = {
  display: "Remove Post",
  props: {
    key: "remove-post",
    description:
      "Removes the location from the public leaderboard. This does not delete the location.",
    startContent: <TbWorldX className="text-red-600 w-6 h-6" />,
  },
};

const updatePost: SimpleDropdownItemType = {
  display: "Update Post",
  props: {
    key: "update-post",
    description:
      "Updates the location posted to the public leaderboard with your current local data.",
    startContent: <RxUpdate className="w-6 h-6" />,
  },
};

type Props = {
  locationId: string;
  publicPost: PublicLeaderboardType | null;
};
/**
 * Location details header with actions.
 * @param {object} param0 props for LocationActions
 * @returns {ReactNode}
 */
const LocationActions = ({
  locationId,
  publicPost: defaultPublicPost,
}: Props) => {
  const router = useRouter();
  const postModal = useDisclosure();
  const updateModal = useDisclosure();
  const [publicPost, setPublicPost] = useState<PublicLeaderboardType | null>(
    defaultPublicPost,
  );

  const locationMenuItems: SimpleDropdownItemType[] = [
    {
      display: "Edit",
      props: {
        key: "edit",
        startContent: <VscEdit className="w-6 h-6" />,
      },
    },
    {
      display: "Delete",
      props: {
        key: "delete",
        description: "Also removes location from the public leaderboard",
        startContent: <VscTrash className="text-red-600 w-6 h-6" />,
        className: "text-red-600",
      },
    },
  ];

  if (publicPost) locationMenuItems.splice(0, 0, ...[updatePost, removePost]);
  else locationMenuItems.splice(0, 0, uploadPost);

  const handleDropDownMenuAction = async (key: Key): Promise<void> => {
    switch (key) {
      case "edit":
        router.push(`${LOCATION_DETAILS}/save/${locationId}`);
        break;
      case "post":
        postModal.onOpen();
        break;
      case "update-post":
        updateModal.onOpen();
        break;
      case "delete":
        localService.deleteLocation(locationId);
        if (publicPost) await removePostFromLeaderboard(locationId);

        router.back();
        break;
      case "remove-post":
        await removePostFromLeaderboard(locationId);
      default:
        break;
    }
  };

  const removePostFromLeaderboard = async (locationId: string) => {
    const res =
      await PublicLeaderboardService.deletePostFromPublicLeaderboard(
        locationId,
      );
    if (res.ok) setPublicPost(null);
  };

  const onSubmitUpdatePostOnLeaderboard = async (
    values: PostToLeadboardFormType,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: (
      nextState?: Partial<FormikState<PostToLeadboardFormType>> | undefined,
    ) => void,
  ) => {
    const location = localService.getLocation(locationId);
    if (!location) return;

    const res = await PublicLeaderboardService.updatePostFromPublicLeaderboard({
      location,
      name: values.name,
    });
    resetPublicPost(res);

    setSubmitting(false);
    resetForm();

    //Refresh the SSR pages so publicPost is changed
    router.refresh();
  };

  const onSubmitPostToLeaderboard = async (
    values: PostToLeadboardFormType,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: (
      nextState?: Partial<FormikState<PostToLeadboardFormType>> | undefined,
    ) => void,
  ) => {
    const location = localService.getLocation(locationId);
    if (!location) return;

    const res = await PublicLeaderboardService.postToLeaderboard({
      location,
      name: values.name,
    });
    resetPublicPost(res);

    setSubmitting(false);
    resetForm();

    //Refresh the SSR pages so publicPost is changed
    router.refresh();
  };

  //This makes sure that the menu actions change on success based on
  //public post state
  const resetPublicPost = async (res: Response) => {
    if (res.ok) {
      const post = (await res.json()) as PublicLeaderboardType;
      setPublicPost(post);
    }
  };

  return (
    <>
      <DropdownWrapper
        trigger={
          <button type="button">
            <BsThreeDots className="w-10 h-10 text-epp-indigo" />
          </button>
        }
        ariaLabel="Location Menu"
        simpleMenuItems={locationMenuItems}
        onAction={handleDropDownMenuAction}
      />

      <PostToLeadboardForm
        modal={postModal}
        onSubmitForm={onSubmitPostToLeaderboard}
      />
      <PostToLeadboardForm
        modal={updateModal}
        onSubmitForm={onSubmitUpdatePostOnLeaderboard}
      />
    </>
  );
};

export default LocationActions;
