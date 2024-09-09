import { getOrdinal } from "@/lib/formatters";
import { PublicLeaderboardType } from "@/types/public-leaderboard.type"

type Props = {
  post: PublicLeaderboardType;
  place: number;
}

const PublicPost = ({post, place}: Props) => {
  const {
    name,
  } = post;

  return (
    <div
      className="rounded-lg bg-papaya p-4 max-h-48 w-full flex flex-row justify-between items-center"
    >
      <span 
        className="font-extrabold text-5xl"
      >
        {getOrdinal(place)}
      </span>
      <span
        className="font-bold text-4xl text-pretty line-clamp-2"
      >
        {name}
      </span>
    </div>
  )
}

export default PublicPost;