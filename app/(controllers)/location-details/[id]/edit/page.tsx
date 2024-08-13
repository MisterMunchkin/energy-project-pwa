import { ServerComponentProps } from "@/types/server-component-props.types";

const EditLocationPage = async ({params}: ServerComponentProps) => {
  console.log(params);

  return (
    <span>Edit Location Page</span>
  )
}

export default EditLocationPage;