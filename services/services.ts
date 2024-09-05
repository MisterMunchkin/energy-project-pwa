import { PublicLeaderboardPostArgs } from "@/app/api/controllers/public-leaderboard/route";
import { API_CONTROLLER, API_PUBLIC_LEADERBOARD } from "@/constants/controller-navigation.constants";
import { ApplianceType } from "@/types/appliance.type";
import { PublicLeaderboardType } from "@/types/public-leaderboard.type";
import { StateEnergyProductionType } from "@/types/state-energy-production.types";
import { StateType } from "@/types/state.type";

namespace Services {
  export const getStates = async () => {
    const reqUrl = `${API_CONTROLLER}states`;
    const res = await fetch(reqUrl, {
      method: 'GET',
    });

    if (!res.ok)
      console.error('energy-sources API threw an error', res.status);

    const states = await res.json() as string[];
    return states;
  }
  export const getAppliances = async () => {
    const reqUrl = `${API_CONTROLLER}appliances`;
    const res = await fetch(reqUrl, {
      method: 'GET',
    });

    if (!res.ok)
      console.error('appliances API threw an error', res.status);

    const appliances = await res.json() as ApplianceType[];
    return appliances;
  }
  export const getEnergyProduction = async (state: StateType) => {
    const searchParams = new URLSearchParams({
      state
    });
  
    const reqUrl = `${API_CONTROLLER}energy-sources?${searchParams}`;
    const res = await fetch(reqUrl, {
      method: 'GET',
    });
  
    if (!res.ok) 
      console.error('energy-sources API threw an error', res.status);
  
    const energyProduction = await res.json() as StateEnergyProductionType;
    return energyProduction;
  }
  export const postToLeaderboard = async (args: PublicLeaderboardPostArgs) => {
    const reqUrl = API_PUBLIC_LEADERBOARD;
    const res = await fetch(reqUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args)
    });

    if (!res.ok)
      console.error('public-leaderboard API threw an error', res.status);
  }
  export const getPublicLeaderboard = async () => {
    const reqUrl = API_PUBLIC_LEADERBOARD;
    const res = await fetch(reqUrl, {
      method: 'GET',
    });

    if (!res.ok)
      console.error('public-leaderboard API threw an error', res.status);

    const publicLeaderBoard = await res.json() as PublicLeaderboardType[];
    return publicLeaderBoard;
  }
  export const getPostFromPublicLeaderboard = async (locationId: string) => {
    const reqUrl = `${API_PUBLIC_LEADERBOARD}/${locationId}`;
    const res = await fetch(reqUrl, {
      method: 'GET',
    });

    if (!res.ok) 
      console.error('public-leaderboard/[id] API threw an error', res.status);

    const {post} = await res.json() as {post: PublicLeaderboardType | null};
    return post;
  }
  export const deletePostFromPublicLeaderboard = async (locationId: string) => {
    const reqUrl = `${API_PUBLIC_LEADERBOARD}/${locationId}`;
    const res = await fetch(reqUrl, {
      method: 'DELETE',
    });

    if (!res.ok)
      console.error('public-leaderboard/[id] API threw an error', res.status, res.statusText);
  }
}

export default Services;