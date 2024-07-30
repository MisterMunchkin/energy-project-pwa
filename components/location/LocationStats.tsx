'use client'

import { localService } from "@/services/local-service";
import { LocationStatsType } from "@/types/location.type";
import { useEffect, useState } from "react";

type Props = {
  locationId: number
}
const LocationStats = ({locationId}: Props) => {
  const [stats, setStats] = useState<LocationStatsType>();

  useEffect(() => {
    const stats = localService.getLocationStats(locationId);
    setStats(stats);
  }, [locationId]);

  return <div>
    
  </div>
}

export default LocationStats;