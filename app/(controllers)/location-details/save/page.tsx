import LocationForm from "@/components/forms/LocationForm";
import Services from "@/services/services";
import { ServerComponentProps } from "@/types/server-component-props.types";

/**
 * SSR page for new location form page
 * @returns ReactNode
 */
const NewLocationPage = async () => {
  const states = await Services.getStates();
  //TODO: Possibly best to move this lower on the tree
  const appliances = await Services.getAppliances();

  return <LocationForm states={states} appliances={appliances} />;
};

export default NewLocationPage;
