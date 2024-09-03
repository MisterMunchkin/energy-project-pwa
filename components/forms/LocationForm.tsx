'use client'

import { ApplianceType } from "@/types/appliance.type";
import { LocationType } from "@/types/location.type";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import ApplianceCard from "../appliance/ApplianceCard";
import ApplianceForm from "./ApplianceForm";

const initialValues: LocationType = {
  id: 0,
  streetAddress: '',
  city: '',
  state: '',
  postalCode: 0,
  appliances: [],
};

type Props = {
  states: string[]
  appliances: ApplianceType[]
}
const LocationForm = ({states, appliances}: Props) => {
  const router = useRouter();
  
  const handleSubmit = (values: LocationType, setSubmitting: (isSubmitting: boolean) => void) => {
    console.log(values);
    setSubmitting(false);
  }

  const renderAddressFields = () => {
    return (
    <>
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

      <div className="default-field-container">
        <label htmlFor="postalCode">Postal Code</label>
        <Field
          className="default-field" 
          id="postalCode" 
          name="postalCode" 
        />
      </div>
    </>
    )
  }

  const renderAppliances = (values: LocationType) => {
    const {
      appliances: locationAppliances = []
    } = values;

    return (
      <FieldArray
        name="appliances"
        render={arrayHelpers => (
          <div>
            <ApplianceForm 
              arrayHelpers={arrayHelpers}
              applianceOptions={appliances}
            />
            {locationAppliances.map((value, index) => (
              <ApplianceCard 
                key={index}
                appliance={value}
              />
            ))}
          </div>
        )}
      />
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values, 
        { setSubmitting }: FormikHelpers<LocationType>
      ) => handleSubmit(values, setSubmitting)}
    >
      {({values}) => (
        <Form className="flex flex-col space-y-4 px-4">
          {renderAddressFields()}
          {renderAppliances(values)}

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
      )}
    </Formik>
  )
}

export default LocationForm;
