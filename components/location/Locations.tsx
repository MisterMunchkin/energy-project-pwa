"use client";

import LocationCard from "./LocationCard";
import Link from "next/link";
import { LOCATION_DETAILS } from "@/constants/controller-navigation.constants";
import { localService } from "@/services/local-service";
import { useEffect, useState } from "react";
import { LocationType } from "@/types/location.type";
import SearchField from "../primitives/SearchField";
import { formatAddress } from "@/lib/formatters";

type Props = {};
/**
 * Renders UI for the location list and search field page.
 *
 * @returns {ReactNode}
 */
const Locations = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<LocationType[]>(
    [],
  );

  //Without useEffect, localStorage access would get a runtime error.
  //Due to Nextjs prerendering on the server side.
  useEffect(() => {
    //TODO: For test purposes only
    // console.time('populating dummies');
    // localService.populateDummies();
    // console.timeEnd('populating dummies');

    const locations = localService.getLocations();
    setLocations(locations);
    setFilteredLocations(locations);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-4">
      <SearchField
        classNames={{
          container: "w-full",
        }}
        placeholder="Search Locations ..."
        onChange={(value) => {
          const filter = locations.filter((location) =>
            formatAddress(location).toLowerCase().includes(value.toLowerCase()),
          );
          setFilteredLocations(filter);
        }}
        name="searchLocation"
      />
      <LocationList locations={filteredLocations} />
    </main>
  );
};

type LocationListProps = {
  locations: LocationType[];
};
const LocationList = ({ locations }: LocationListProps) => {
  return (
    <>
      {locations.map((location, index) => (
        <Link
          className="w-full"
          key={index}
          href={{
            pathname: `${LOCATION_DETAILS}/${location.id}`,
          }}
        >
          <LocationCard location={location} isLink />
        </Link>
      ))}
    </>
  );
};

export default Locations;
