import Appliances from "@/components/appliance/Appliances";
import LocationBarChart from "@/components/location/LocationBarChart";
import LocationStats from "@/components/location/LocationStats";
import DropdownWrapper, { SimpleDropdownItemType } from "@/components/wrappers/DropdownWrapper";
import { ServerComponentProps } from "@/types/server-component-props.types";
import Link from "next/link";
import { Key } from "react";
import { BsThreeDots } from "react-icons/bs";
import { TbWorldUpload } from "react-icons/tb";
import { VscArrowLeft } from "react-icons/vsc";
import LocationHeader from "./LocationHeader";

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

  return <main
    className="py-[50px] flex flex-col space-y-4 bg-epp-white"
  >
    {/* Chart, back button, and menu */}
    <div className="flex flex-col ">
      <LocationHeader 
        locationId={idString}
      />
      <LocationBarChart locationId={idString} />
    </div>
    {/* Location Stats and Appliances List */}
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
  </main>
}
export default LocationDetails;
