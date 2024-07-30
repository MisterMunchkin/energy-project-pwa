import { API_CONTROLLER } from "@/constants/controller-navigation.constants";
import { ApplianceType } from "@/types/appliance.type";
import { ServerComponentProps } from "@/types/server-component-props.types";

//TODO: This might need to be a client component since we
// Need access to the localstorage to retrieve locations.

/**
 * @param {serverComponentProps} serverComponentProps Strictly types NextJs server navigation from a `<Link />`. 
 * 
*/
const LocationDetails = async ({searchParams}: ServerComponentProps) => {

  const {
    id
  } = searchParams || {};

  if (!id) 
    throw new Error('passing `id` is required for `LocationDetails`');
  
  const appliances = await getAppliances();

  return <main>
  </main>
}
export default LocationDetails;

const getAppliances = async() => {
  const res = await fetch(`${API_CONTROLLER}appliances`, {
    method: 'GET'
  });

  if (!res.ok)
    console.error('API threw an error', res.status);

  const appliances = await res.json() as ApplianceType[];
  return appliances;
};

