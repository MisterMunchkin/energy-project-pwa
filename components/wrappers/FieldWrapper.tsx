/**
 * Handles displaying validation messages from Formik
 */

import { ClassValues } from "@/lib/clsx";
import { cn } from "@nextui-org/theme";
import { Field } from "formik";
import { ReactNode } from "react"

type Props = {
  name: string;
  label: string;
  component?: string;
  children?: ReactNode;
  validation?: () => string | undefined;
  errors?: string;
  touched?: boolean;
  classNames?: ClassValues<"container" | "label" | "field" | "error">
}
const FieldWrapper = ({name, label, component, children, validation, errors, touched, classNames}: Props) => {
  return <div className={cn(
      "default-field-container",
      classNames?.container
    )}>
    <label 
      htmlFor={name}
      className={cn(
        "",
        classNames?.label
      )}
    >
      {label}
    </label>
    <Field
      className={cn(
        "",
        classNames?.field
      )}
      id={name}
      name={name}
      component={component}
      validate={validation}
    >
      {children}
    </Field>
    {errors && touched && <div className={cn("", classNames?.error)}>{errors}</div>}
  </div>
}

export default FieldWrapper;