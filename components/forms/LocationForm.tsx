'use client'

import { ApplianceType } from "@/types/appliance.type";
import { LocationType } from "@/types/location.type";
import { FieldArray, Form, Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { useRouter } from "next/navigation";
import ApplianceCard from "@/components/appliance/ApplianceCard";
import ApplianceForm from "./ApplianceForm";
import TextField from "@/components/primitives/TextField";
import SelectField from "@/components/primitives/SelectField";

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

  const renderAddressFields = (errors: FormikErrors<LocationType>, touched: FormikTouched<LocationType>) => {
    return (
    <>
      <TextField 
        name="streetAddress"
        label="Street Address"
        classNames={{
          field: "default-field"
        }}
        errors={errors.streetAddress}
        touched={touched.streetAddress}
      />

      <TextField 
        name="city"
        label="City"
        classNames={{
          field: "default-field"
        }}
        errors={errors.city}
        touched={touched.city}
      />

      <SelectField
        name="state"
        label="State"
        classNames={{
          field: "default-field"
        }}
        errors={errors.state}
        touched={touched.state}
      >
        {states.map((value, index) => (
          <option
            key={index}
            value={value}
          >
            {value}
          </option>
        ))}
      </SelectField>

      <TextField 
        name="postalCode"
        label="Postal Code"
        classNames={{
          field: "default-field",
          container: "w-24"
        }}
        errors={errors.postalCode}
        touched={touched.postalCode}
      />
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
            <div className="mt-4 mb-2 space-y-2 h-64 overflow-y-auto">
              {locationAppliances.map((value, index) => (
                <ApplianceCard 
                  key={index}
                  appliance={value}
                />
              ))}
            </div>
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
      {({values, errors, touched}) => (
        <Form className="flex flex-col space-y-4 px-4">
          {renderAddressFields(errors, touched)}
          {renderAppliances(values)}

          <div className="pb-4 flex justify-center space-x-8">
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
