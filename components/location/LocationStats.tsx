"use client";

import { localService } from "@/services/local-service";
import { LocationStatsType } from "@/types/location.type";
import { useEffect, useState } from "react";

type Props = {
  locationId: string;
};
/**
 * Renders the location stats for the location details page.
 *
 * @param {string} locationId locationId used to retrieve location from the local storage service
 * @returns {ReactNode}
 */
const LocationStats = ({ locationId }: Props) => {
  const [stats, setStats] = useState<LocationStatsType>();

  useEffect(() => {
    const stats = localService.getLocationStats(locationId);
    setStats(stats);
  }, [locationId]);

  return (
    <section
      id="location-stats"
      className="flex flex-row justify-start items-center space-x-12"
    >
      <div className="flex flex-col">
        <span className="font-bold text-3xl">{stats?.totalWHSPerDay ?? 0}</span>
        <span className="font-normal text-sm">WHS/day</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-3xl">
          {stats?.totalAppliances ?? 0}
        </span>
        <span className="font-normal text-sm">Total appliances</span>
      </div>
    </section>
  );
};

export default LocationStats;
