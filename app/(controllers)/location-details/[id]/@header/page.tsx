import { PublicLeaderboardService } from "@/services/services";
import LocationHeader from "../LocationHeader";
import { ServerComponentProps } from "@/types/server-component-props.types";

export default async function Header({params}: ServerComponentProps) {
  const {
    id: idString
  } = params || {};
  if (!idString) 
    throw new Error('passing `id` is required for `Header`. id: ' + idString);

  const publicPost = await PublicLeaderboardService.getPostFromPublicLeaderboard(idString); 
  return (
    <LocationHeader 
      locationId={idString}
      publicPost={publicPost}
    />
  )
}