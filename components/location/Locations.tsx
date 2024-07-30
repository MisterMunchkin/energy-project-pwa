
import { DUMMY_LOCATIONS } from "@/constants/dummy-data.constants";
import LocationCard from "./LocationCard";
import Link from "next/link";
import { ROUTE_CONTROLLER } from "@/constants/controller-navigation.constants";

type Props = {

}
const Locations = () => {
  return <main className="flex min-h-screen flex-col items-center space-y-4 p-4">
    {DUMMY_LOCATIONS.map((location, index) => (
      <Link
        className="w-full"
        key={index}
        href={{
          pathname: `${ROUTE_CONTROLLER}location-details/${location.id}`
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