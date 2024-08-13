import Appliances from "@/components/appliance/Appliances";
import LocationBarChart from "@/components/location/LocationBarChart";
import LocationStats from "@/components/location/LocationStats";
import { ServerComponentProps } from "@/types/server-component-props.types";
import Link from "next/link";
import { VscArrowLeft } from "react-icons/vsc";


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

  return <main
    className="flex flex-col space-y-4 bg-epp-white"
  >
    {/* Chart, back button, and menu */}
    <div className="flex flex-col ">
      <div className="pt-4 px-2">
        <Link
          className="cursor-pointer w-10"
          href='/'
        >
          <VscArrowLeft
            className="text-epp-indigo w-10 h-10"
          />
        </Link>
      </div>
      <LocationBarChart locationId={id} />
    </div>
    {/* Location Stats and Appliances List */}
    <div
      className="flex flex-col space-y-8 p-4 bg-epp-white scroll-auto rounded-t-2xl"
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
