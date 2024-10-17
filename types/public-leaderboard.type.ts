import { LocationClass, LocationType } from "./location.type";
import { StateEnergyProductionType } from "./state-energy-production.types";

/**
 * Used for the Public Leaderboard feature. The feature sorts all posts by the most
 * renewable energy production and the highest watt hour per day. renewables are
 * solar, wind, and gas production.
 *
 * @property {string} locationId The id of the location this post is from.
 * @property {number} solarProduction solar production of this leaderboard post
 * @property {number} windProduction wind production of this leaderboard post
 * @property {number} gasProduction gas production of this leaderboard post
 * @property {number} coalProduction coal production of this leaderboard post
 * @property {number} totalWHSPerDay The total wattage per hour per day for this given public leaderboard post
 * @property {string} name The name given for this leaderboard post
 */
export type PublicLeaderboardType = {
  locationId: string;
  solarProduction: number;
  windProduction: number;
  gasProduction: number;
  coalProduction: number;
  totalWHSPerDay: number;
  name: string;
  state: string;
};

/**
 * Utility class for Public Leaderboard feature.
 */
export class PublicLeaderboardClass implements PublicLeaderboardType {
  locationId: string = "";
  solarProduction: number = 0;
  windProduction: number = 0;
  gasProduction: number = 0;
  coalProduction: number = 0;
  totalWHSPerDay: number = 0;
  name: string = "";
  state: string = "";

  constructor(post?: PublicLeaderboardType) {
    if (!post) return;

    this.locationId = post.locationId;
    this.solarProduction = post.solarProduction;
    this.windProduction = post.windProduction;
    this.gasProduction = post.gasProduction;
    this.coalProduction = post.coalProduction;
    this.totalWHSPerDay = post.totalWHSPerDay;
    this.name = post.name;
    this.state = post.state;
  }

  static createTypeBy(
    location: LocationType,
    stateProduction: StateEnergyProductionType,
    name?: string,
  ): PublicLeaderboardType {
    const {
      energySources: { wind, solar, gas, coal },
    } = stateProduction;
    const { totalWHSPerDay, state } = new LocationClass(location);

    const post: PublicLeaderboardType = {
      locationId: location.id,
      solarProduction: solar,
      windProduction: wind,
      gasProduction: gas,
      coalProduction: coal,
      totalWHSPerDay: totalWHSPerDay,
      name: name ?? location.id,
      state: state,
    };

    return post;
  }

  static getTotalRenewableEnergyProduction(
    post: PublicLeaderboardType,
  ): number {
    return post.solarProduction + post.windProduction;
  }
}
