export type LocationType = {
  id: number;
  streetAddress: string;
  city: string;
  state: string;
  appliances: LocationApplianceType[];
}

/**
 * An appliance within a location. Also tracks the number of appliances, the
 * hours its running, and the total watt hour per day.
 * 
 * @property {string} name Name of appliance
 * @property {number} quantity Number of the same appliance in a location
 * @property {number} hoursPerDay Number of hours the appliances are running per day.
 * @property {number} totalWHSPerDay Calculated watt-hours per day for this appliance object. (watt * hoursPerDay) * quantity where watt is a constant fetch from server
 */
type LocationApplianceType = {
  name: string;
  quantity: number;
  hoursPerDay: number;
  totalWHSPerDay: number;
}
