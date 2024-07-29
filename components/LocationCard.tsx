import { LocationType } from "@/types/location.type";

type Props = {
  location: LocationType;
}
const LocationCard = (props: Props) => {
  const {
    streetAddress,
    city,
    state,
    appliances
  } = props.location;

  const fullLocation = `${streetAddress} ${city} ${state}`;
  const applianceCount = appliances.length;
  const totalWattHoursPerDay = appliances.reduce((acc, curr) => curr.totalWHSPerDay + acc, 0);

  return (
    <div className="rounded-lg bg-papaya flex flex-col p-4 max-h-48 space-y-8">
      <span
        className="font-bold text-2xl text-pretty line-clamp-2"
      >
        {fullLocation}
      </span>

      <div className="flex flex-row justify-between font-semibold text-lg">
        <span>{applianceCount}</span>
        <span>{totalWattHoursPerDay + ' whs/day'}</span>
      </div>
    </div>
  )
}

export default LocationCard;