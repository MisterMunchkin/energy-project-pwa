import { PublicLeaderboardType } from "@/types/public-leaderboard.type"
import PublicPost from "./PublicPost";

type Props = {
  publicLeaderboard: PublicLeaderboardType[];
}
const PublicLeaderboard = ({publicLeaderboard}: Props) => {
  return <div className="p-4 space-y-4">
    {publicLeaderboard.map((post, index) => (
      <PublicPost 
        key={index}
        post={post}
        place={index + 1}
      />
    ))}
  </div>
}

export default PublicLeaderboard;