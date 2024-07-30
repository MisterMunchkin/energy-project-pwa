import Appliances from "@/components/appliance/Appliances";
import BackIcon from "@/components/icons/BackIcon";
import LocationStats from "@/components/location/LocationStats";
import { API_CONTROLLER } from "@/constants/controller-navigation.constants";
import { ApplianceType } from "@/types/appliance.type";
import { ServerComponentProps } from "@/types/server-component-props.types";
import Link from "next/link";

//TODO: This might need to be a client component since we
// Need access to the localstorage to retrieve locations.

/**
 * @param {serverComponentProps} serverComponentProps Strictly types NextJs server navigation from a `<Link />`. 
 * 
*/
const LocationDetails = async ({params}: ServerComponentProps) => {

  const {
    id: idString
  } = params || {};
  if (!idString) 
    throw new Error('passing `id` is required for `LocationDetails`. id: ' + idString);
  
  const id = parseInt(idString);
  if (isNaN(id)) 
    throw new Error('`id` needs to be a number. id: ' + id);
  //This is just a test, we can remove this later on
  // const appliances = await getAppliances();

  return <main
    className="p-4 flex flex-col"
  >
    <div>
      <Link
        className="cursor-pointer w-10"
        href='/'
      >
        <BackIcon
          className="text-epp-indigo w-10 h-10"
        />
      </Link>
    </div>
    <div
      className="flex flex-col space-y-8"
    >
      <LocationStats
        locationId={id}
      />
      <Appliances 
        locationId={id}
      />
    </div>
  </main>
}
export default LocationDetails;

const getAppliances = async() => {
  const res = await fetch(`${API_CONTROLLER}appliances`, {
    method: 'GET'
  });

  if (!res.ok)
    console.error('API threw an error', res.status);

  const appliances = await res.json() as ApplianceType[];
  return appliances;
};

