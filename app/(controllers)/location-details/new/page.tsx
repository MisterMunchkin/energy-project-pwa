import { ServerComponentProps } from "@/types/server-component-props.types";

const NewLocationPage = async ({params}: ServerComponentProps) => {
  console.log(params);
  return (
    <span>New Location Page.</span>
  )
}

export default NewLocationPage;