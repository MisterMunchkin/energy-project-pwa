'use client'

import { LocationType } from "@/types/location.type";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Suspense } from "react";

const initialValues: LocationType = {
  id: 0,
  streetAddress: '',
  city: '',
  state: '',
  appliances: []
};

type Props = {
  states: string[];
}
const LocationForm = ({states}: Props) => {
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
      <Form>
        <label htmlFor="streetAddress">Street Address</label>
        <Field id="streetAddress" name="streetAddress" />

        <label htmlFor="city">City</label>
        <Field id="city" name="city" />

        <Suspense>
          <label htmlFor="state">State</label>
          <Field
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
        </Suspense>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default LocationForm;
