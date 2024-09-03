'use client'

import LocationCard from "./LocationCard";
import Link from "next/link";
import { LOCATION_DETAILS } from "@/constants/controller-navigation.constants";
import { localService } from "@/services/local-service";
import { useEffect, useState } from "react";
import { LocationType } from "@/types/location.type";

type Props = {

}
/**
 * Client Component to handle localStorage retrieval.
 *
 */
const Locations = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  //Without useEffect, localStorage access would get a runtime error.
  //Due to Nextjs prerendering on the server side.
  useEffect(() => {
    //TODO: For test purposes only
    // console.time('populating dummies');
    // localService.populateDummies();
    // console.timeEnd('populating dummies');
    
    const locations = localService.getLocations();
    setLocations(locations);
  }, []);


  return <main className="flex min-h-screen flex-col items-center space-y-4 p-4">
    {locations.map((location, index) => (
      <Link
        className="w-full"
        key={index}
        href={{
          pathname: `${LOCATION_DETAILS}/${location.id}`
        }}
      >
        <LocationCard 
          location={location}
          isLink
        />
      </Link>
    ))}
</main>
}

export default Locations;