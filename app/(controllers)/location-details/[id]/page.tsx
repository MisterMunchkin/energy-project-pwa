import Appliances from "@/components/appliance/Appliances";
import LocationStats from "@/components/location/LocationStats";
import { ServerComponentProps } from "@/types/server-component-props.types";
import LocationSummary from "@/components/location/LocationSummary";

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

  return <>
    <LocationSummary 
      locationId={idString}
    />
    <div
      className="flex flex-col space-y-8 p-4 bg-epp-white scroll-auto rounded-t-2xl"
    >
      <LocationStats
        locationId={idString}
      />
      <Appliances 
        locationId={idString}
      />
    </div>
  </>
}
export default LocationDetails;
