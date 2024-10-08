/**
 * A location object and the appliances within that location.
 * 
 * @property {LocationApplianceTypep[]} appliances A list of appliances for the given location.
 */
export type LocationType = {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: number;
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
export type LocationApplianceType = {
  name: string;
  quantity: number;
  hoursPerDay: number;
  watts: number;
}


/**
 * Statistics for a given location
 * 
 * @property {number} totalWHSPerDay
 * @property {number} totalAppliances
 */
export type LocationStatsType = {
  totalWHSPerDay: number;
  totalAppliances: number;
}

/**
 * A class that takes a locationType. This class gives utility getters
 * Needed for business logic
 *  */ 
export class LocationClass implements LocationType {
  id: string = '';
  streetAddress: string = '';
  city: string = '';
  state: string = '';
  postalCode: number = 0;
  appliances: LocationApplianceType[] = [];

  constructor(location: LocationType) {
    this.id = location.id;
    this.streetAddress = location.streetAddress;
    this.city = location.city;
    this.state = location.state;
    this.appliances = location.appliances;
    this.postalCode = location.postalCode;
  }

  get totalWHSPerDay(): number {
    const appliances = this.appliances.map(appliance => new LocationApplianceClass(appliance))
    return appliances.reduce((acc, curr) => curr.totalWHSPerDay + acc, 0);
  }

  get totalAppliances(): number {
    return this.appliances.length;
  }

  get locationStats(): LocationStatsType {
    return {
      totalAppliances: this.totalAppliances,
      totalWHSPerDay: this.totalWHSPerDay,
    } as LocationStatsType
  }
}

/**
 * A class that takes a LocationApplianceType. It gives utility getters
 * for business logic.
 */
export class LocationApplianceClass implements LocationApplianceType {
  name: string = '';
  quantity: number = 0;
  hoursPerDay: number = 0;
  watts: number = 0;
  
  constructor(locationAppliance: LocationApplianceType) {
    const {
      name,
      quantity,
      hoursPerDay,
      watts,
    } = locationAppliance;

    this.name = name;
    this.quantity = quantity;
    this.hoursPerDay = hoursPerDay;
    this.watts = watts;
  }

  get totalWHSPerDay(): number {
    return (this.watts * this.hoursPerDay) * this.quantity;
  }
}