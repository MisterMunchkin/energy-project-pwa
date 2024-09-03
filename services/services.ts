import { API_CONTROLLER } from "@/constants/controller-navigation.constants";
import { ApplianceType } from "@/types/appliance.type";
import { LocationType } from "@/types/location.type";
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
  export const postToLeaderboard = async (location: LocationType) => {
    const reqUrl = `${API_CONTROLLER}public-leaderboard`;
    const res = await fetch(reqUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    });

    if (!res.ok)
      console.error('public-leaderboard API threw an error', res.status);
  } 
}

export default Services;