'use client'

import { LocationType } from "@/types/location.type";

/**
 * @param {location} location data to display to cards.
 * @param {isLink} isLink boolean show correct cursor pointer if linkable
 */
type Props = {
  location: LocationType;
  isLink?: boolean
}
const LocationCard = ({location, isLink}: Props) => {
  const {
    streetAddress,
    city,
    state,
    appliances
  } = location;

  const fullLocation = `${streetAddress} ${city} ${state}`;
  const applianceCount = appliances.length;
  const totalWattHoursPerDay = appliances.reduce((acc, curr) => curr.totalWHSPerDay + acc, 0);

  return (
    <div 
      className={`rounded-lg bg-papaya flex flex-col p-4 max-h-48 w-full space-y-8
        ${(isLink) ? 'cursor-pointer' : 'cursor-default'}`}
    >
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