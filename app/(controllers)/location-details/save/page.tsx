import LocationForm from "@/components/forms/LocationForm";
import Services from "@/services/services";
import { ServerComponentProps } from "@/types/server-component-props.types";
import { Suspense } from "react";

const NewLocationPage = async ({params}: ServerComponentProps) => {
  console.log(params);
  const states = await Services.getStates();
  return (
    <Suspense fallback={<span>...is loading</span>}>
      <LocationForm 
        states={states}
      />
    </Suspense>
  )
}

export default NewLocationPage;