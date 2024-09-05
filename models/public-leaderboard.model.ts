import { LocationClass, LocationType } from "@/types/location.type";
import { BaseModel } from "./base.model";
import { PublicLeaderboardClass, PublicLeaderboardType } from "@/types/public-leaderboard.type";
import { StateEnergyProductionType } from "@/types/state-energy-production.types";

/**
 * Accesses the data relating to the PublicLeaderboard data.
 * 
 * @implements PublicLeaderboardType to create polymorphic `this` for insert behavior
 */
export class PublicLeaderboardModel extends BaseModel<PublicLeaderboardType> implements PublicLeaderboardType {
  locationId: string = '';
  solarProduction: number = 0;
  windProduction: number = 0;
  gasProduction: number = 0;
  coalProduction: number = 0;
  totalWHSPerDay: number = 0;
  name: string = '';

  constructor() {
    super(PublicLeaderboardModel.name);
  }

  /**
   * Posts the location to the public leaderboard.
   * @param {LocationType} location The location to post
   * @param {StateEnergyProductionType} stateProduction The state energy production of the given location
   * @param {string} name The name the user gave for this post
   */
  post (
    location: LocationType, 
    stateProduction: StateEnergyProductionType,
    name?: string,
  ): void {
    const {
      createTypeBy
    } = PublicLeaderboardClass;

    const newPost = createTypeBy(
      location,
      stateProduction,
      name
    );

    this.insert(newPost);
  }

  /**
   * Retrieves the leaderboard posts and sorts it by the highest renewable
   * energy production first, then if left hand is false (0), it will compare by totalWHSPerDay
   */
  getSortedLeaderboard = () => {
    const {
      getTotalRenewableEnergyProduction: get
    } = PublicLeaderboardClass;

    const sortedLeaderboard = this.select()
      .sort((a, b) => 
        get(b) - get(a) || b.totalWHSPerDay - a.totalWHSPerDay
      );

    return sortedLeaderboard;
  }
}
