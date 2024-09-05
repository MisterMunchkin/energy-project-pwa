import { LocationType } from "@/types/location.type";
import { BaseModel } from "./base.model";
import { PublicLeaderboardClass, PublicLeaderboardType } from "@/types/public-leaderboard.type";
import { StateEnergyProductionType } from "@/types/state-energy-production.types";

/**
 * Accesses the data relating to the PublicLeaderboard data.
 */
export class PublicLeaderboardModel extends BaseModel<PublicLeaderboardType> {
  constructor() {
    super(PublicLeaderboardModel.name);
  }

  /**
   * Finds the post by location id
   * 
   * @param {string} locationId The id...
   */
  findBy(locationId: string) {
    const dataList = this.select(item => item.locationId === locationId);
    if (!dataList || dataList.length === 0)
      return null;

    return dataList[0];
  }

  /**
   * Posts the location to the public leaderboard.
   * @param {LocationType} location The location to post
   * @param {StateEnergyProductionType} stateProduction The state energy production of the given location
   * @param {string} name The name the user gave for this post
   */
  post = (
    location: LocationType, 
    stateProduction: StateEnergyProductionType,
    name?: string,
  ): void => {
    if (this.exists(location.id)) {
      console.error('Post with the same location id already exists! locationId: ' + location.id);
      return;
    }
       

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

  exists = (locationId: string): boolean => {
    const dataList = this.select(item => item.locationId === locationId);
    return dataList && dataList.length > 0;
  }
}
