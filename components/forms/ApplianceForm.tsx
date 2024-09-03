"use client";

import { ApplianceType } from "@/types/appliance.type";
import { LocationApplianceType } from "@/types/location.type";
import { FieldArrayRenderProps, Form, Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import ModalWrapper, { ModalFooterComponentType, ModalTriggerComponentType } from "@/components/wrappers/ModalWrapper";
import FieldWrapper from "@/components/wrappers/FieldWrapper";

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
/**
 * A Formik form for creating an Appliance for a Location.
 * 
 * @param {arrayHelpers} arrayHelpers A field array for nested Formik Arrays. Comes with helper functions
 * @param {applianceOptions} applianceOptions A list of appliances that can be selected.
 */
const ApplianceForm = ({applianceOptions, arrayHelpers}: Props) => {
  const sortedAppliances = applianceOptions.sort((a, b) => a.name.localeCompare(b.name));

  const handleSubmit = (values: LocationApplianceType, setSubmitting: (isSubmitting: boolean) => void) => {
    console.log(values);
    arrayHelpers.push(values);
    setSubmitting(false);
  }

  const renderFormBody = (errors: FormikErrors<LocationApplianceType>, touched: FormikTouched<LocationApplianceType>) => {
    return (
      <Form className="space-y-4">
        <FieldWrapper
          name="name"
          label="Appliance"
          component="select"
          classNames={{
            field: "default-field"
          }}
          errors={errors.name}
          touched={touched.name}
        >
          {sortedAppliances.map(({name}, index) => (
            <option
              key={index}
              value={name}
            >
              {name}
            </option>
          ))}
        </FieldWrapper>
        <FieldWrapper 
          name="hoursPerDay"
          label="Hours"
          classNames={{
            container: "w-20",
            field: "default-field"
          }}
          errors={errors.hoursPerDay}
          touched={touched.hoursPerDay}
        />
        <FieldWrapper 
          name="quantity"
          label="Quantity"
          classNames={{
            container: "w-20",
            field: "default-field"
          }}
          errors={errors.quantity}
          touched={touched.quantity}
        />
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
        {({submitForm, errors, touched}) => (

          <ModalWrapper
            title="Add new appliance"
            FooterComponent={ApplianceModalFooter}
            ModalTriggerComponent={ApplianceModalTrigger}
            onSubmit={() => submitForm()}
          >
            {renderFormBody(errors, touched)}
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
