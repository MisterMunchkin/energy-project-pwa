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
      className="rounded-lg bg-epp-aqua flex flex-col p-4 max-h-32 space-y-4"
    >
      <span
        className="font-bold text-xl"
      >
        {quantity} {name} for {hoursPerDay} hours
      </span>
      <span>
        <span 
          className="font-bold text-base"
        >
          {totalWHSPerDay}
        </span> whs/day
      </span>
    </div>
  )
}

export default ApplianceCard;