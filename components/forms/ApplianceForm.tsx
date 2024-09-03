"use client";

import { ApplianceType } from "@/types/appliance.type";
import { LocationApplianceType } from "@/types/location.type";
import { FieldArrayRenderProps, Form, Formik, FormikErrors, FormikHelpers, FormikState, FormikTouched } from "formik";
import ModalWrapper, { ModalFooterComponentType, ModalTriggerComponentType } from "@/components/wrappers/ModalWrapper";
import TextField from "@/components/primitives/TextField";
import React from "react";
import SelectField from "../primitives/SelectField";

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

  const handleSubmit = (
    values: LocationApplianceType, 
    setSubmitting: (isSubmitting: boolean) => void, 
    resetForm:  (nextState?: Partial<FormikState<LocationApplianceType>> | undefined) => void
  ) => {
    arrayHelpers.push(values);
    resetForm();
    setSubmitting(false);
  }

  const renderFormBody = (
    errors: FormikErrors<LocationApplianceType>, 
    touched: FormikTouched<LocationApplianceType>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<LocationApplianceType>>
  ) => {
    return (
      <Form className="space-y-4">
        <SelectField
          name="name"
          label="Appliance"
          classNames={{
            field: "default-field"
          }}
          errors={errors.name}
          touched={touched.name}
          setFieldValue={setFieldValue}
          onChange={(event) => {
            const {
              value
            } = event.target;
            const appliance = applianceOptions.find(appliance => appliance.name === value);
            if (!appliance)
              throw new Error("Unable to find appliance by appliance name: " + value);
        
            setFieldValue('watts', appliance.watts);
            console.log(value);
          }}
        >
          {sortedAppliances.map(({name}, index) => (
            <option
              key={index}
              value={name}
            >
              {name}
            </option>
          ))}
        </SelectField>
        <TextField 
          name="hoursPerDay"
          label="Hours"
          classNames={{
            container: "w-20",
            field: "default-field"
          }}
          errors={errors.hoursPerDay}
          touched={touched.hoursPerDay}
        />
        <TextField 
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
        initialValues={{
          name: sortedAppliances[0].name,
          watts: sortedAppliances[0].watts,
          quantity: 1,
          hoursPerDay: 1,
        }}
        onSubmit={(
          values,
          { setSubmitting, resetForm }: FormikHelpers<LocationApplianceType>,
        ) => handleSubmit(values, setSubmitting, resetForm)}
      >
        {({submitForm, errors, touched, setFieldValue}) => (

          <ModalWrapper
            title="Add new appliance"
            FooterComponent={ApplianceModalFooter}
            ModalTriggerComponent={ApplianceModalTrigger}
            onSubmit={() => submitForm()}
          >
            {renderFormBody(errors, touched, setFieldValue)}
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
      className="py-4 border-4 border-dashed border-epp-indigo rounded-2xl text-epp-indigo w-full"
      onClick={onOpen}  
    >
      + Add Appliance
    </button>
  );
}
