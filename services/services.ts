import { API_CONTROLLER } from "@/constants/controller-navigation.constants";
import { ApplianceType } from "@/types/appliance.type";

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
}

export default Services;