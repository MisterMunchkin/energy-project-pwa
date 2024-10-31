import {
  PublicLeaderboardPostArgs,
  PublicLeaderboardPutArgs,
} from "@/app/api/controllers/public-leaderboard/route";
import {
  API_CONTROLLER,
  API_NATIONAL_STATISTICS,
  API_PUBLIC_LEADERBOARD,
  RevalidatePath,
} from "@/constants/controller-navigation.constants";
import { ApplianceType } from "@/types/appliance.type";
import { NationalStatisticsType } from "@/types/national-statistics.type";
import { PublicLeaderboardType } from "@/types/public-leaderboard.type";
import { StateEnergyProductionType } from "@/types/state-energy-production.types";
import { StateType } from "@/types/state.type";

/**
 * Http Services for the NextJs API.
 */
namespace Services {
  /**
   * Gets all the states from the servers
   * @returns retrieves an array of states
   */
  export const getStates = async () => {
    const reqUrl = `${API_CONTROLLER}states`;
    const res = await fetch(reqUrl, {
      method: "GET",
    });

    if (!res.ok) console.error("energy-sources API threw an error", res.status);

    const states = (await res.json()) as string[];
    return states;
  };
  /**
   * Gets all the appliances from the servers
   * @returns retrieves an array of ApplianceType
   */
  export const getAppliances = async () => {
    const reqUrl = `${API_CONTROLLER}appliances`;
    const res = await fetch(reqUrl, {
      method: "GET",
    });

    if (!res.ok) console.error("appliances API threw an error", res.status);

    const appliances = (await res.json()) as ApplianceType[];
    return appliances;
  };
  /**
   *
   * @param state specific state to retrieve energy sources from
   * @returns Retrieves the energy production for the state passed
   */
  export const getEnergyProduction = async (state: StateType) => {
    const searchParams = new URLSearchParams({
      state,
    });

    const reqUrl = `${API_CONTROLLER}energy-sources?${searchParams}`;
    const res = await fetch(reqUrl, {
      method: "GET",
    });

    if (!res.ok) console.error("energy-sources API threw an error", res.status);

    const energyProduction = (await res.json()) as StateEnergyProductionType;
    return energyProduction;
  };
}
export default Services;

/**
 * PublicLeaderboardService for NextJs API
 */
export namespace PublicLeaderboardService {
  /**
   *
   * @param args form body for POST-ing to the public leaderboard
   * @returns data saved to the public leaderboard. (Was not exactly necessary in the app which is why its not typed, but if it because necessary it can be typed. Mainnly returned a response for testing purposes)
   */
  export const postToLeaderboard = async (args: PublicLeaderboardPostArgs) => {
    //TODO: revalidatePath not working yet on Nextjs 14 API Route
    const reqUrl =
      API_PUBLIC_LEADERBOARD +
      "?" +
      new URLSearchParams({
        "path-to-revalidate": RevalidatePath.LOCATION_DETAILS_PAGE,
      });

    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!res.ok)
      console.error("public-leaderboard API threw an error", res.status);

    return res;
  };
  /**
   * Retrieves sorted list.
   * @returns Returns a sorted list of public leaderboard posts. Sort logic is in the model
   */
  export const getPublicLeaderboard = async () => {
    const reqUrl = API_PUBLIC_LEADERBOARD;
    const res = await fetch(reqUrl, {
      method: "GET",
      cache: "no-store", //TODO: Should be removed once revalidatePath is working
    });

    if (!res.ok)
      console.error("public-leaderboard API threw an error", res.status);

    const publicLeaderBoard = (await res.json()) as PublicLeaderboardType[];
    return publicLeaderBoard;
  };
  /**
   * retrieves leaderboard post based off of location id
   * @param locationId LocationId to retrieve from public leaderboard
   * @returns retrieves the leaderboard post
   */
  export const getPostFromPublicLeaderboard = async (locationId: string) => {
    const reqUrl = `${API_PUBLIC_LEADERBOARD}/${locationId}`;
    const res = await fetch(reqUrl, {
      method: "GET",
      cache: "no-store", //TODO: Should be removed once revalidatePath is working
    });

    if (!res.ok)
      console.error("public-leaderboard/[id] API threw an error", res.status);

    const { post } = (await res.json()) as {
      post: PublicLeaderboardType | null;
    };
    return post;
  };
  /**
   * deletes the leaderboard post and response with the deleted leaderboard. Mainly used for testing purposes, might also be useful to show user statistics of deleted post. idk.
   * @param locationId LocationId to delete from public leaderboard
   * @returns retrieves the leaderboard post deleted
   */
  export const deletePostFromPublicLeaderboard = async (locationId: string) => {
    const reqUrl = `${API_PUBLIC_LEADERBOARD}/${locationId}`;
    const res = await fetch(reqUrl, {
      method: "DELETE",
    });

    if (!res.ok)
      console.error(
        "public-leaderboard/[id] API threw an error",
        res.status,
        res.statusText,
      );

    return res;
  };
  /**
   * Sends the LocationType and name for the public leaderboard PUT request, and receives the new leaderboard object after update.
   * @param args Update request for a specific post within the public leaderboard
   * @returns returns the new leaderboard post object after update.
   */
  export const updatePostFromPublicLeaderboard = async (
    args: PublicLeaderboardPutArgs,
  ) => {
    const reqUrl = `${API_PUBLIC_LEADERBOARD}`;
    const res = await fetch(reqUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    if (!res.ok)
      console.error("public-leaderboard API threw an error", res.status);

    return res;
  };
  /**
   * Retrieves national statistics values
   * @returns Retrieves national statistics values
   */
  export const getNationalStatistics = async () => {
    const reqUrl = `${API_NATIONAL_STATISTICS}`;
    const res = await fetch(reqUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok)
      console.error("national-statistics API threw an error", res.status);

    const data = (await res.json()) as NationalStatisticsType;
    return data;
  };
}
