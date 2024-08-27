'use client'

import { LocationType } from "@/types/location.type";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

const initialValues: LocationType = {
  id: 0,
  streetAddress: '',
  city: '',
  state: '',
  appliances: []
};

type Props = {
  states: string[]
}
const LocationForm = ({states}: Props) => {
  const router = useRouter();
  
  const handleSubmit = (values: LocationType, setSubmitting: (isSubmitting: boolean) => void) => {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values, 
        { setSubmitting }: FormikHelpers<LocationType>
      ) => handleSubmit(values, setSubmitting)}
    >
      <Form className="flex flex-col space-y-4 px-4">
        <div className="default-field-container">
          <label htmlFor="streetAddress">Street Address</label>
          <Field className="default-field" id="streetAddress" name="streetAddress" />
        </div>

        <div className="default-field-container">
          <label htmlFor="city">City</label>
          <Field className="default-field" id="city" name="city" />
        </div>

        <div className="default-field-container">
          <label htmlFor="state">State</label>
          <Field
            className="default-field"
            component="select"
            id="state"
            name="state"
          >
            {states.map((value, index) => (
              <option
                key={index}
                value={value}
              >
                {value}
              </option>
            ))}
          </Field>
        </div>
        <div className="flex justify-center space-x-8">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="rounded-lg bg-red-500 text-epp-white py-1.5 px-4 text-lg"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="rounded-lg bg-epp-spring-green text-epp-indigo py-1.5 px-4 text-lg"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default LocationForm;
