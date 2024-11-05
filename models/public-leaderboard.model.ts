import { LocationType } from "@/types/location.type";
import { BaseModel } from "./base.model";
import {
  PublicLeaderboardClass,
  PublicLeaderboardType,
} from "@/types/public-leaderboard.type";
import { StateEnergyProductionType } from "@/types/state-energy-production.types";
import { NationalStatisticsType } from "@/types/national-statistics.type";

/** *Class instance of PublicLeaderboard data cached in node-cache. 
 extends BaseModel
 */
export class PublicLeaderboardModel extends BaseModel<PublicLeaderboardType> {
  /**
   * Instantiates model, name used as key for node-cache object values.
   */
  constructor() {
    super(PublicLeaderboardModel.name);
  }

  /**
   *
   * @param {object} location locationType to update in the leaderboard data list
   * @param {object} stateProduction energy production of the state based on location
   * @param {string} name leaderboard post name, could be updated too, leaderboard keeps track of locations through locationId generated on insert in the local storage service.
   * @returns {PublicLeaderboardType | undefined} the leaderboard post after update
   */
  update = (
    location: LocationType,
    stateProduction: StateEnergyProductionType,
    name?: string,
  ): PublicLeaderboardType | undefined => {
    this.delete(location.id);

    const { createTypeBy } = PublicLeaderboardClass;

    const updatedPost = createTypeBy(location, stateProduction, name);

    this.insert(updatedPost);
    return updatedPost;
  };

  /**
   * Deletes the post by location id
   *
   *
   * Need to retrieve the dataList, then populate it back because the current
   * basemodel does not support finding by properties because of generic T type.
   *
   * In the future, need to setup T where implements {id: string}
   *
   * @param {string} locationId id to delete in the public leaderboard
   * @returns {object | void} returns a soft error message if cannot find the post
   */
  delete = (locationId: string) => {
    const dataList = this.select();
    const index = dataList.findIndex((item) => item.locationId === locationId);
    if (index === -1) {
      console.error("Could not find post with locationId: " + locationId);
      return {
        errMessage: "Could not find post with locationId: " + locationId,
      };
    }

    dataList.splice(index, 1);
    this.populate(dataList);
  };

  /**
   * Finds the post by location id
   *
   * @param {string} locationId The id...
   * @returns {object}
   */
  findBy = (locationId: string) => {
    const dataList = this.select((item) => item.locationId === locationId);
    if (!dataList || dataList.length === 0) return null;

    return dataList[0];
  };

  /**
   * Posts the location to the public leaderboard.
   * @param {LocationType} location The location to post
   * @param {StateEnergyProductionType} stateProduction The state energy production of the given location
   * @param {string} name The name the user gave for this post
   *
   * @returns {PublicLeaderboardType | undefined} the new leaderboard post created
   */
  post = (
    location: LocationType,
    stateProduction: StateEnergyProductionType,
    name?: string,
  ): PublicLeaderboardType | undefined => {
    if (this.exists(location.id)) {
      console.error(
        "Post with the same location id already exists! locationId: " +
          location.id,
      );
      return;
    }

    const { createTypeBy } = PublicLeaderboardClass;

    const newPost = createTypeBy(location, stateProduction, name);

    this.insert(newPost);
    return newPost;
  };

  /**
   * Retrieves the leaderboard posts and sorts it by the highest renewable
   * energy production first, then if left hand is false (0), it will compare by totalWHSPerDay
   *
   * @returns {PublicLeaderboardType[]} the sorted leaderboard posts.
   */
  getSortedLeaderboard = () => {
    const { getTotalRenewableEnergyProduction: get } = PublicLeaderboardClass;

    const sortedLeaderboard = this.select().sort(
      (a, b) => get(b) - get(a) || b.totalWHSPerDay - a.totalWHSPerDay,
    );

    return sortedLeaderboard;
  };

  /**
   *
   * @param {string} locationId location id to check if it exists in the leaderboard
   * @returns {boolean} true or false depending if location exists
   */
  exists = (locationId: string): boolean => {
    const dataList = this.select((item) => item.locationId === locationId);
    return dataList && dataList.length > 0;
  };

  /**
   * retrieves the national statistics based on all posts within the leaderboard.
   * @returns {NationalStatisticsType} retrieves the results
   */
  nationalStatistics = (): NationalStatisticsType => {
    const leaderboard = this.select();

    const result: NationalStatisticsType = {
      totalWHSPerDayPer: {
        wind: 0,
        solar: 0,
        gas: 0,
        coal: 0,
      },
    };

    leaderboard.forEach((post) => {
      result.totalWHSPerDayPer.coal += this.getWattHourPer(
        post,
        post.coalProduction,
      );
      result.totalWHSPerDayPer.wind += this.getWattHourPer(
        post,
        post.windProduction,
      );
      result.totalWHSPerDayPer.solar += this.getWattHourPer(
        post,
        post.solarProduction,
      );
      result.totalWHSPerDayPer.gas += this.getWattHourPer(
        post,
        post.gasProduction,
      );
    });

    return result;
  };

  private getWattHourPer(
    post: PublicLeaderboardType,
    sourcePercentage: number,
  ) {
    const decimal = sourcePercentage / 100;
    return post.totalWHSPerDay * decimal;
  }
}
