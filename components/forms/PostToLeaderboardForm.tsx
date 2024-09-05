import { Formik, FormikHelpers, FormikState } from "formik"
import ModalWrapper from "../wrappers/ModalWrapper";
import PostToLeaderboardModalFooter from "../modals/PostToLeaderboardModalFooter";
import { useDisclosure } from "@nextui-org/modal";
import InputField from "../primitives/InputField";
import Validators from "@/lib/form-validators";

export type PostToLeadboardFormType = {
  name: string;
}

type Props = {
  modal: ReturnType<typeof useDisclosure>;
  onSubmitForm: (values: PostToLeadboardFormType, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<PostToLeadboardFormType>> | undefined) => void) => void;
} 
const PostToLeadboardForm = ({modal, onSubmitForm}: Props) => {

  return (
    <>
      <Formik
        initialValues={{
          name: ''
        }}
        onSubmit={(
          values,
          { setSubmitting, resetForm }: FormikHelpers<PostToLeadboardFormType>,
        ) => onSubmitForm(values, setSubmitting, resetForm)}
      >
        {({submitForm, errors, touched, isValid, resetForm}) => (
          <ModalWrapper
            title="New Post"
            FooterComponent={PostToLeaderboardModalFooter}
            onSubmit={submitForm}
            extraFooterComponentProps={{
              isValid,
              resetForm
            }}
            useDisclosure={modal}
          >
            <InputField 
              name="name"
              label="Post Name"
              type="text"
              classNames={{
                error: "text-red-600 font-semibold",
                field: "default-field"
              }}
              errors={errors.name}
              touched={touched.name}
              validation={Validators.leaderboardPostName}
            />
          </ModalWrapper>
        )}
      </Formik>
    </>
  )
}

export default PostToLeadboardForm;