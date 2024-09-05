import { FormikState } from "formik";
import { ModalFooterComponentType } from "../wrappers/ModalWrapper";
import { PostToLeadboardFormType } from "../forms/PostToLeaderboardForm";

type ExtraProps = {
  isValid: boolean,
  resetForm: (nextState?: Partial<FormikState<PostToLeadboardFormType>> | undefined) => void;
}
const PostToLeaderboardModalFooter = ({onClose, onSubmit, extraProps}: ModalFooterComponentType<ExtraProps>) => {
  const {
    isValid,
    resetForm,
  } = extraProps ?? {};

  return (
    <>
      <button 
        type="button" 
        onClick={() => {
          resetForm && resetForm();
          onClose();
        }}
        className="rounded-lg bg-red-500 text-epp-white py-1.5 px-4 text-lg"
      >
        Cancel
      </button>
      <button 
        type="button"
        onClick={() => {
          onSubmit && onSubmit();
          if (isValid)
            onClose();
        }} 
        className="rounded-lg bg-epp-spring-green text-epp-indigo py-1.5 px-4 text-lg"
      >
        Post
      </button>
    </>
  )
}

export default PostToLeaderboardModalFooter;