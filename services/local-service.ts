import { LOCATIONS } from "@/constants/local-service.constants";
import { LocationApplianceType, LocationType } from "@/types/location.type";

/**
 * Retrieves all appliances for a specific location.
 * 
 * @param {locationId} LocationId The id of the location where the appliances are saved.
 */
const getAppliances = (locationId: number): LocationApplianceType[] => {
  const jsonData = localStorage.getItem(LOCATIONS);
  
  if (!jsonData) {
    console.error(`'${LOCATIONS}' in localStorage is empty.`);
    return [];
  }
  
  const locations = JSON.parse(jsonData) as LocationType[];
  const appliances = locations
    .find((location) => location.id === locationId)
    ?.appliances ?? [];

  return appliances;
}

export const localService = {
  getAppliances,
}