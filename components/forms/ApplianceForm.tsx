"use client";

import { ApplianceType } from "@/types/appliance.type";
import { LocationApplianceType } from "@/types/location.type";
import { Field, FieldArrayRenderProps, Form, Formik, FormikHelpers } from "formik";
import ModalWrapper, { ModalFooterComponentType, ModalTriggerComponentType } from "@/components/wrappers/ModalWrapper";

const initialValues: LocationApplianceType = {
  name: '',
  quantity: 1,
  hoursPerDay: 1,
  totalWHSPerDay: 0 //Will be calculated
};
type Props = {
  arrayHelpers: FieldArrayRenderProps;
  applianceOptions: ApplianceType[];
}
const ApplianceForm = ({applianceOptions, arrayHelpers}: Props) => {
  const sortedAppliances = applianceOptions.sort((a, b) => a.name.localeCompare(b.name));

  const handleSubmit = (values: LocationApplianceType, setSubmitting: (isSubmitting: boolean) => void) => {
    console.log(values);
    arrayHelpers.push(values);
    setSubmitting(false);
  }

  const renderFormBody = () => {
    return (
      <Form className="space-y-4">
        <div className="default-field-container">
          <label htmlFor="appliance-type">Appliance</label>
          <Field
            className="default-field"
            component="select"
            id="name"
            name="name"
          >
            {sortedAppliances.map(({name}, index) => (
              <option
                key={index}
                value={name}
              >
                {name}
              </option>
            ))}
          </Field>
        </div>
        <div className="default-field-container w-20">
          <label htmlFor="hoursPerDay">Hours</label>
          <Field 
            className="default-field" 
            id="hoursPerDay" 
            name="hoursPerDay" 
            type="number"  
          />
        </div>
        <div className="default-field-container w-20">
          <label htmlFor="quantity">Quantity</label>
          <Field 
            className="default-field" 
            id="quantity" 
            name="quantity" 
            type="number"  
          />
        </div>
      </Form>
    )
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values,
          { setSubmitting }: FormikHelpers<LocationApplianceType>
        ) => handleSubmit(values, setSubmitting)}
      >
        {(subformik) => (

          <ModalWrapper
            title="Add new appliance"
            FooterComponent={ApplianceModalFooter}
            onSubmit={() => subformik.submitForm()}
            ModalTriggerComponent={ApplianceModalTrigger}
          >
            {renderFormBody()}
          </ModalWrapper>
        )}
      </Formik>
    </>
  )
}

export default ApplianceForm;

const ApplianceModalFooter = ({onClose, onSubmit}: ModalFooterComponentType) => {
  return (
    <>
      <button 
        type="button" 
        onClick={onClose}
        className="rounded-lg bg-red-500 text-epp-white py-1.5 px-4 text-lg"
      >
        Cancel
      </button>
      <button 
        type="button"
        onClick={() => {
          onSubmit && onSubmit();
          onClose();
        }} 
        className="rounded-lg bg-epp-spring-green text-epp-indigo py-1.5 px-4 text-lg"
      >
        Submit
      </button>
    </>
  )
}

const ApplianceModalTrigger = ({onOpen}: ModalTriggerComponentType) => {
  return (
    <button 
      type="button"
      className="py-4  border-4 border-dashed border-epp-indigo rounded-2xl text-epp-indigo"
      onClick={onOpen}  
    >
      + Add Appliance
    </button>
  );
}
