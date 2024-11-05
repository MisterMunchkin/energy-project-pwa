import { PublicLeaderboardService } from "@/services/services";
import { ServerComponentProps } from "@/types/server-component-props.types";
import Link from "next/link";
import { VscArrowLeft } from "react-icons/vsc";
import LocationActions from "../LocationHeader";

/**
 * SSR parallel route for the header route
 * @param {object} param0 ServerComponent props with id param
 * @returns {ReactNode}
 */
export default async function Header({ params }: ServerComponentProps) {
  const { id: idString } = params || {};
  if (!idString)
    throw new Error("passing `id` is required for `Header`. id: " + idString);

  const publicPost =
    await PublicLeaderboardService.getPostFromPublicLeaderboard(idString);
  return (
    <div className="p-2 flex flex-row justify-between items-center">
      <Link className="cursor-pointer" href="/">
        <VscArrowLeft className="text-epp-indigo w-10 h-10" />
      </Link>
      <LocationActions locationId={idString} publicPost={publicPost} />
    </div>
  );
}
