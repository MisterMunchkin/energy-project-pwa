import { DUMMY_LOCATIONS } from "@/constants/dummy-data.constants";
import { LOCATIONS } from "@/constants/local-service.constants";
import { LocationApplianceType, LocationClass, LocationStatsType, LocationType } from "@/types/location.type";
import { StateType } from "@/types/state.type";

/**
 * Retrieves all appliances for a specific location.
 * 
 * @param {locationId} LocationId The id of the location where the appliances are saved.
 */
const getAppliances = (locationId: string): LocationApplianceType[] => {
  if (!isStorageDefined()) return [];

  const location = getLocationClass(locationId);
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
const getLocationStats = (locationId: string): LocationStatsType | undefined => {
  if(!isStorageDefined()) return;

  const location = getLocationClass(locationId);
  return location?.locationStats;
}

/**
 * Gets the state for a given location.
 */
const getState = (locationId: string): StateType | undefined => {
  if (!isStorageDefined()) return;

  const location = getLocationClass(locationId);
  return (location?.state as StateType) ?? undefined;
}

/**
 * Gets a location class instance.
 * 
 * @usage If there are location class logic that is needed to retrieve data.
 */
const getLocationClass = (locationId: string): LocationClass | undefined => {
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
 * Pushes new location into local storage
 * @param {LocationType} newLocation The new location to push into local storage
 */
const createLocation = (newLocation: LocationType): void => {
  if (!isStorageDefined()) return;

  const jsonData = localStorage.getItem(LOCATIONS);
  let locations: LocationType[] = [];
  if (jsonData)
    locations = JSON.parse(jsonData) as LocationType[];
  
  newLocation.id = window.crypto.randomUUID();
  locations.push(newLocation);
  localStorage.setItem(LOCATIONS, JSON.stringify(locations));
}

/**
 * Updates the saved location in local storage
 * @param {LocationType} editedLocation The edited location to save
 */
const editLocation = (editedLocation: LocationType): void => {
  if (!isStorageDefined()) return;

  const jsonData = localStorage.getItem(LOCATIONS);
  let locations: LocationType[] = [];
  if(jsonData)
    locations = JSON.parse(jsonData) as LocationType[];

  const index = locations.findIndex(location => location.id === editedLocation.id);
  if (index < 0) {
    console.error('Could not find location in local storage with locationId: ' + editedLocation.id);
    return;
  }

  locations.splice(index, 1, editedLocation);
  localStorage.setItem(LOCATIONS, JSON.stringify(locations));
}

/**
 * Retrieves the location from the local storage based off locationId
 * 
 * @param {string} locationId Id of the location to find
 */
const getLocation = (locationId: string): LocationType | undefined => {
  if (!isStorageDefined()) return;

  const jsonData = localStorage.getItem(LOCATIONS);
  if (!jsonData) {
    console.error(`'${LOCATIONS}' in localStorage is empty.`);
    return;
  }

  const locations = JSON.parse(jsonData) as LocationType[];
  const location = locations.find(location => location.id === locationId);
  if (!location)
    console.error('Could not find location in local storage with locationId: '+ locationId);
  
  return location;
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
  createLocation,
  getLocation,
  editLocation,
}