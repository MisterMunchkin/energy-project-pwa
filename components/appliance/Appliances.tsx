'use client'

import { localService } from "@/services/local-service";
import ApplianceCard from "./ApplianceCard";
import { useCallback } from "react";

type Props = {
  locationId: number;
}
/**
 * A client side component to render appliances for a given location.
 * 
 * Location is known from the `locationId` prop.
 * 
 * Needs to be a client component to retrieve localStorage items.
 * @param {locationId} locationId The id of a given location. 
 */
const Appliances = (props: Props) => {
  const {
    locationId
  } = props;

  const appliances = localService.getAppliances(locationId);

  const renderAppliances = useCallback(() => {
    return appliances.map((appliance, index) => (
      <ApplianceCard
        key={index}
        appliance={appliance}
      />
    ));
  }, [appliances])
  
  return <section
      id="appliances"
      className="flex flex-col space-y-4"
    >
      <span
        className="font-bold text-xl"
      >Appliances</span>
      <div 
        className="flex flex-col space-y-4 pl-2"
      >
        {(appliances && appliances.length > 0) ? (
          renderAppliances()
        ) : (
          <span>No appliances</span>
        )}
      </div>
    </section>
}

export default Appliances;