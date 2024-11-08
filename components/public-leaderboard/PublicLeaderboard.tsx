import { PublicLeaderboardType } from "@/types/public-leaderboard.type";
import PublicPost from "./PublicPost";
import { BiWorld } from "react-icons/bi";
import Link from "next/link";
import { NATIONAL_STATISTICS } from "@/constants/controller-navigation.constants";

type Props = {
  publicLeaderboard: PublicLeaderboardType[];
};
/**
 * Aside from the PublicPosts it also renders the link to national statistics
 * @param {PublicLeaderboardType[]} publicLeaderboard list of publicleaderboard posts sorted from the API
 * @returns {ReactNode}
 */
const PublicLeaderboard = ({ publicLeaderboard }: Props) => {
  return (
    <div className="flex flex-col items-end space-y-2">
      <div className="px-4 pt-4">
        <Link
          href={{
            pathname: `${NATIONAL_STATISTICS}`,
          }}
        >
          <BiWorld className="w-8 h-8" />
        </Link>
      </div>
      <div className="p-4 space-y-4 w-full">
        {publicLeaderboard.map((post, index) => (
          <PublicPost key={index} post={post} place={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default PublicLeaderboard;
