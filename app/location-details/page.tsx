import { ServerComponentProps } from "@/types/server-component-props.types";

const LocationDetails = ({searchParams}: ServerComponentProps) => {
  const {
    id
  } = searchParams;
  if (!id) 
    throw new Error('passing `id` is required for `LocationDetails`');

  console.log(id);
  return <main>

  </main>
}

export default LocationDetails;