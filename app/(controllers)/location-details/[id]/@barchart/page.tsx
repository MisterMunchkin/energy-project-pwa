import LocationBarChart from "@/components/location/LocationBarChart";
import { ServerComponentProps } from "@/types/server-component-props.types";

export default function BarChart({params}: ServerComponentProps) {
  const {
    id: idString
  } = params || {};
  if (!idString) 
    throw new Error('passing `id` is required for `BarChart`. id: ' + idString);

  return (
      <LocationBarChart locationId={idString} />
  )
}