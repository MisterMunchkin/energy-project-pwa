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
};

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
};

/**
 * Statistics for a given location
 *
 * @property {number} totalWHSPerDay
 * @property {number} totalAppliances
 */
export type LocationStatsType = {
  totalWHSPerDay: number;
  totalAppliances: number;
};

/**
 * A class that takes a locationType. This class gives utility getters
 * Needed for business logic
 *
 *  @property {string} id
    @property {string} streetAddress
    @property {string} city
    @property {string} state
    @property {string} postalCode
    @property {LocationApplianceType[]} appliances An array of appliances linked to a location.
 */
export class LocationClass implements LocationType {
  id: string = "";
  streetAddress: string = "";
  city: string = "";
  state: string = "";
  postalCode: number = 0;
  appliances: LocationApplianceType[] = [];

  /**
   * instantiates a LocationClass, if post is empty, instantiates an
   * empty class.
   * @param location Optional args to instantiate a LocationClass
   * @returns void
   */
  constructor(location: LocationType) {
    this.id = location.id;
    this.streetAddress = location.streetAddress;
    this.city = location.city;
    this.state = location.state;
    this.appliances = location.appliances;
    this.postalCode = location.postalCode;
  }

  /**
   * getter for retrieving the totalWHSPerDay for this instance
   *
   * @returns {number} total WHS per day retrieved by each appliance WHS per day.
   */
  get totalWHSPerDay(): number {
    const appliances = this.appliances.map(
      (appliance) => new LocationApplianceClass(appliance),
    );
    return appliances.reduce((acc, curr) => curr.totalWHSPerDay + acc, 0);
  }

  /**
   * getter for retrieving total appliances in this instance
   *
   * @returns {number} total appliances in this instance
   */
  get totalAppliances(): number {
    return this.appliances.length;
  }

  /**
   * getter for wrapper totalAppliances, and totalWHSPerDay into a nice little object for ease of use.
   *
   * @return {LocationStatsType} location statistics that wraps the utility getters in this instance
   */
  get locationStats(): LocationStatsType {
    return {
      totalAppliances: this.totalAppliances,
      totalWHSPerDay: this.totalWHSPerDay,
    } as LocationStatsType;
  }
}

/**
 * A class that takes a LocationApplianceType. It gives utility getters
 * for business logic.
 * 
 *  @property {number} name Name of appliance
    @property {number} quantity number of the same appliance
    @property {number} hoursPerDay hours it runs
    @property {number} watts wattage of appliance
 */
export class LocationApplianceClass implements LocationApplianceType {
  name: string = "";
  quantity: number = 0;
  hoursPerDay: number = 0;
  watts: number = 0;

  /**
   * instantiates a LocationApplianceClass. required.
   *
   * @param locationAppliance args to instantiate the type LocationApplianceType.
   * @returns void
   */
  constructor(locationAppliance: LocationApplianceType) {
    const { name, quantity, hoursPerDay, watts } = locationAppliance;

    this.name = name;
    this.quantity = quantity;
    this.hoursPerDay = hoursPerDay;
    this.watts = watts;
  }

  /**
   * getter for retrieving totalWHSPerDays
   *
   * @returns total WHS per day by multiplying watts, hoursPerDay and quantity
   */
  get totalWHSPerDay(): number {
    return this.watts * this.hoursPerDay * this.quantity;
  }
}
