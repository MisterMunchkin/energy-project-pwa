"use client"

import { localService } from "@/services/local-service"
import { LocationType } from "@/types/location.type"
import { useEffect, useState } from "react"
import AccordionWrapper from "../wrappers/AccordionWrapper"
import { formatAddress } from "@/lib/formatters"

type Props = {
  locationId: string
}
/**
 * Component for display the location address within the
 * location-details page.
 */
const LocationSummary = ({locationId}: Props) => {
  const [location, setLocation] = useState<Omit<LocationType, "appliances">>({
    id: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: 0
  });

  useEffect(() => {
    const location = localService.getLocation(locationId);
    if (!location)
      return;

    setLocation(location);
  }, [locationId]);

  return <section
    id="location-summary"
    className="px-4"
  >
    <AccordionWrapper 
      accordions={[
        {
          title: "Address Details",
          content: formatAddress(location)
        }
      ]}
      variant="bordered"
    />
  </section>
}

export default LocationSummary;