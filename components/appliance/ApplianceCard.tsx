import { LocationApplianceType } from "@/types/location.type";

type Props = {
  appliance: LocationApplianceType;
}
const ApplianceCard = ({appliance}: Props) => {
  const {
    name,
    quantity,
    hoursPerDay,
    totalWHSPerDay
  } = appliance;

  return (
    <div
      className="rounded-lg bg-epp-aqua flex flex-col px-4 pt-2 pb-6 max-h-20"
    >
      <span className="place-self-end text-sm">
        <span 
          className="font-bold"
        >
          {totalWHSPerDay}
        </span> whs/day
      </span>
      <span
        className="text-lg"
      >
        <span className="font-bold text-xl">
          {quantity} {name} {' '}
        </span> 
        for {' '}
        <span className="font-bold text-xl">
          {hoursPerDay}
        </span> hours
      </span>
    </div>
  )
}

export default ApplianceCard;