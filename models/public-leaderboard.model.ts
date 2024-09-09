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
   * Deletes the post by location id
   * 
   * 
   * Need to retrieve the dataList, then populate it back because the current
   * basemodel does not support finding by properties because of generic T type.
   * 
   * In the future, need to setup T where implements {id: string}
   */
  delete = (locationId: string) => {
    const dataList = this.select();
    const index = dataList.findIndex(item => item.locationId === locationId);
    if (index === -1) {
      console.error('Could not find post with locationId: ' + locationId);
      return { errMessage: 'Could not find post with locationId: ' + locationId };
    }

    dataList.splice(index, 1);
    this.populate(dataList);
  }

  /**
   * Finds the post by location id
   * 
   * @param {string} locationId The id...
   */
  findBy = (locationId: string) => {
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
  ): PublicLeaderboardType | undefined => {
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
    return newPost;
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
