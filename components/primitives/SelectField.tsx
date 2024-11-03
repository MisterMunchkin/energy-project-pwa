import { ClassValues } from "@/lib/clsx";
import { cn } from "@nextui-org/theme";
import { Field, FormikErrors } from "formik";
import React, { ReactNode } from "react";

type Props<T> = {
  name: string;
  label: string;
  children?: ReactNode;
  validation?: () => string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<T>>;
  errors?: string;
  touched?: boolean;
  classNames?: ClassValues<"container" | "label" | "field" | "error">;
};
/**
 * Wraps the Formik Field and handles error display.
 * Also allows for classNames for each part of the wrapper. see clsx.ts comments
 *
 * @param {name} name The name and id used for the Formik object
 * @param {label} label The label displayed for the field
 * @param {children} children Optional children to render within the Formik Field
 * @param {validation} validation Option function to pass down to Formik Field validation
 * @param {onChange} onChange Optional onChange if you would like to handle how changes are dealt. Also need to hanle value changes
 * @param {setFieldValue} setFieldValue Optional setFieldValue, required if manually handling onChange
 * @param {errors} errors Optional string which should be the errors state of the Formik object
 * @param {touched} touched Optional boolean value which should be the touched state of the Formik object
 * @param {classNames} classNames Optional classNames for container, label, field, and error
 */
const SelectField = <T,>({
  name,
  label,
  children,
  validation,
  onChange,
  setFieldValue,
  errors,
  touched,
  classNames,
}: Props<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue && setFieldValue(name, event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={cn("default-field-container", classNames?.container)}>
      <label htmlFor={name} className={cn("", classNames?.label)}>
        {label}
      </label>
      <Field
        className={cn("", classNames?.field)}
        id={name}
        name={name}
        component="select"
        validate={validation}
        {...(onChange && setFieldValue ? { onChange: handleChange } : {})}
      >
        {children}
      </Field>
      {errors && touched && (
        <div className={cn("", classNames?.error)}>{errors}</div>
      )}
    </div>
  );
};

export default SelectField;
