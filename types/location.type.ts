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
export type LocationApplianceType = {
  name: string;
  quantity: number;
  hoursPerDay: number;
  totalWHSPerDay: number;
}


export type LocationStatsType = {
  totalWHSPerDay: number;
  totalAppliances: number;
}

export class LocationClass implements LocationType {
  id: number = 0;
  streetAddress: string = '';
  city: string = '';
  state: string = '';
  appliances: LocationApplianceType[] = [];

  constructor(location: LocationType) {
    this.id = location.id;
    this.streetAddress = location.streetAddress;
    this.city = location.city;
    this.state = location.state;
    this.appliances = location.appliances;
  }

  get totalWHSPerDay(): number {
    return this.appliances.reduce((acc, curr) => curr.totalWHSPerDay + acc, 0);
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