import LocationForm from "@/components/forms/LocationForm";
import Services from "@/services/services";
import { ServerComponentProps } from "@/types/server-component-props.types";

const NewLocationPage = async ({params}: ServerComponentProps) => {
  const states = await Services.getStates();

  return (
    <LocationForm 
      states={states}
    />
  )
}

export default NewLocationPage;
