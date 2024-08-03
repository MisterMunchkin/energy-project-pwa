import { DUMMY_LOCATIONS } from "@/constants/dummy-data.constants";
import { LOCATIONS } from "@/constants/local-service.constants";
import { LocationApplianceType, LocationClass, LocationStatsType, LocationType } from "@/types/location.type";
import { StateType } from "@/types/state.type";

/**
 * Retrieves all appliances for a specific location.
 * 
 * @param {locationId} LocationId The id of the location where the appliances are saved.
 */
const getAppliances = (locationId: number): LocationApplianceType[] => {
  if (!isStorageDefined()) return [];

  const location = getLocation(locationId);
  return location?.appliances ?? [];
}

const getLocations = (): LocationType[] => {
  if (!isStorageDefined()) return [];

  const jsonData = localStorage.getItem(LOCATIONS);

  if (!jsonData) {
    console.error(`'${LOCATIONS}' in localStorage is empty.`);
    return [];
  }

  const locations = JSON.parse(jsonData) as LocationType[];
  return locations;
}

const getLocationStats = (locationId: number): LocationStatsType | undefined => {
  if(!isStorageDefined()) return;

  const location = getLocation(locationId);
  return location?.locationStats;
}

const getState = (locationId: number): StateType | undefined => {
  if (!isStorageDefined()) return;

  const location = getLocation(locationId);
  return (location?.state as StateType) ?? undefined;
}

const getLocation = (locationId: number): LocationClass | undefined => {
  const jsonData = localStorage.getItem(LOCATIONS);
  if (!jsonData) {
    console.error(`'${LOCATIONS}' in localStorage is empty.`);
    return;
  }

  const locations = JSON.parse(jsonData) as LocationType[];
  const location = locations.find(location => location.id === locationId);
  return (location) ? new LocationClass(location) : undefined;
}

const populateDummies = (): void => {
  if (!isStorageDefined()) return;

  localStorage.removeItem(LOCATIONS);

  const locationData = JSON.stringify(DUMMY_LOCATIONS);
  localStorage.setItem(LOCATIONS, locationData);
}

const isStorageDefined = (): boolean => {
  const isDefined = (typeof window !== 'undefined');

  if (!isDefined) {
    const error = new Error('Calling localStorage from the server, place calls to localStorage inside a `useEffect`');
    console.error(error.message);
  }
  
  return isDefined;
}

export const localService = {
  getAppliances,
  populateDummies,
  getLocations,
  getLocationStats,
  getState,
}