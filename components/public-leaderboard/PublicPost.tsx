import { cn } from "@/lib/cn";
import { getOrdinal } from "@/lib/formatters";
import { PublicLeaderboardType } from "@/types/public-leaderboard.type"
import { Chip } from "@nextui-org/chip";

type Props = {
  post: PublicLeaderboardType;
  place: number;
}

const PublicPost = ({post, place}: Props) => {
  const {
    name,
    gasProduction,
    coalProduction,
    windProduction,
    solarProduction,
    totalWHSPerDay,
  } = post;

  const energyChips = [
    {
      dotStyle: 'bg-epp-indigo',
      content: windProduction + '%'
    },
    {
      dotStyle: 'bg-epp-orange',
      content: solarProduction + '%'
    },
    {
      dotStyle: 'bg-epp-spring-green',
      content: gasProduction + '%'
    },
    {
      dotStyle: 'bg-light-red',
      content: coalProduction + '%'
    },
  ]
  
  const placeStyle = () => {
    if (place === 1)
      return 'text-gold';
    if (place === 2)
      return 'text-silver';
    if (place === 3)
      return 'text-bronze';
  }

  return (
    <div className="flex flex-col rounded-lg bg-papaya p-4 w-full space-y-4">
      <div
        className="flex flex-row justify-between items-center"
      >
        <span 
          className={cn(
            "font-extrabold text-3xl", 
            placeStyle()
          )}
        >
          {getOrdinal(place)}
        </span>
        <span
          className="font-bold text-xl text-pretty line-clamp-2"
        >
          {name}
        </span>
      </div>
      <div className="flex flex-col space-y-1 items-end">
        <div className="flex flex-row items-center space-x-0.5">
          {energyChips.map((({dotStyle, content}, index) => (
            <Chip 
              key={index}
              variant="dot" 
              classNames={{
                base: 'border-0 p-0',
                dot: dotStyle,
                content: 'font-semibold px-1'
              }}
            >
              {content}
            </Chip>
          )))}
        </div>
        <Chip
          variant="shadow"
          classNames={{
            base: 'bg-winkle '
          }}
        >
          <span className="font-semibold">{totalWHSPerDay}</span>{' WHS/day'}
        </Chip>
      </div>
    </div>
  )
}

export default PublicPost;