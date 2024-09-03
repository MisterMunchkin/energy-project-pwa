'use client'

import { ApplianceType } from "@/types/appliance.type";
import { LocationType } from "@/types/location.type";
import { FieldArray, Form, Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { useRouter } from "next/navigation";
import ApplianceCard from "@/components/appliance/ApplianceCard";
import ApplianceForm from "./ApplianceForm";
import InputField from "@/components/primitives/InputField";
import SelectField from "@/components/primitives/SelectField";
import Validators from "@/lib/form-validators";
import { VscTrash } from "react-icons/vsc";

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
      <InputField 
        name="streetAddress"
        label="Street Address"
        classNames={{
          error: 'text-red-600 font-semibold',
          field: "default-field"
        }}
        errors={errors.streetAddress}
        touched={touched.streetAddress}
        validation={Validators.streetAddress}
      />

      <InputField 
        name="city"
        label="City"
        classNames={{
          error: 'text-red-600 font-semibold',
          field: "default-field",
        }}
        errors={errors.city}
        touched={touched.city}
        validation={Validators.city}
      />

      <SelectField
        name="state"
        label="State"
        classNames={{
          error: 'text-red-600 font-semibold',
          field: "default-field",
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

      <InputField 
        name="postalCode"
        label="Postal Code"
        type="number"
        classNames={{
          error: 'text-red-600 font-semibold',
          field: "default-field w-24",
        }}
        errors={errors.postalCode}
        touched={touched.postalCode}
        validation={Validators.postalCode}
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
                <div
                  key={index}
                  className="flex flex-row items-center space-x-2"
                >
                  <ApplianceCard
                    appliance={value}
                    classNames={{
                      container: "grow"
                    }}
                  />
                  <button 
                    type="button"
                    className="rounded-full bg-red-600 p-2.5 text-center"
                    onClick={() => arrayHelpers.remove(index)}  
                  >
                    <VscTrash className="text-epp-white w-6 h-fit" />
                  </button>
                </div>
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
