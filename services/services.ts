import { API_CONTROLLER } from "@/constants/controller-navigation.constants";

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
}

export default Services;