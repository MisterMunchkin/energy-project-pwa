import LocationForm from "@/components/forms/LocationForm";
import Services from "@/services/services";
import { ServerComponentProps } from "@/types/server-component-props.types";

/**
 * SSR Edit location page
 * @param param0 server component props with id param
 * @returns ReactNode
 */
const EditLocationPage = async ({ params }: ServerComponentProps) => {
  const { id: idString } = params || {};

  const states = await Services.getStates();
  const appliances = await Services.getAppliances();

  return (
    <LocationForm
      states={states}
      appliances={appliances}
      locationId={idString}
    />
  );
};

export default EditLocationPage;
