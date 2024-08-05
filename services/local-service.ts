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

/**
 * Retrieves all locations and their given appliance types.
 */
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

/**
 * Gets the location stats {totalWHSPerDay, totalAppliances} for a given locationId
 */
const getLocationStats = (locationId: number): LocationStatsType | undefined => {
  if(!isStorageDefined()) return;

  const location = getLocation(locationId);
  return location?.locationStats;
}

/**
 * Gets the state for a given location.
 */
const getState = (locationId: number): StateType | undefined => {
  if (!isStorageDefined()) return;

  const location = getLocation(locationId);
  return (location?.state as StateType) ?? undefined;
}

/**
 * Gets a location class instance.
 * 
 * @usage If there are location class logic that is needed to retrieve data.
 */
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

/**
 * Because of Nextjs SSR, window may be undefined if the component is rendered on server side.
 * 
 * Nextjs also pre-renders Client Components in the server, so the calls need to come within a `useEffect`
 */
const isStorageDefined = (): boolean => {
  const isDefined = (typeof window !== 'undefined');

  if (!isDefined) {
    const error = new Error('Calling localStorage from the server, place calls to localStorage inside a `useEffect`');
    console.error(error.message);
  }
  
  return isDefined;
}

/**
 * Can only be called on `useEffects` due to NextJs SSR. Client Components
 * are also pre-rendered on the server which is why `useEffect` is needed.
 */
export const localService = {
  getAppliances,
  populateDummies,
  getLocations,
  getLocationStats,
  getState,
}