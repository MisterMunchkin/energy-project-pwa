/**
 * Handles displaying validation messages from Formik
 */

import { ClassValues } from "@/lib/clsx";
import { cn } from "@nextui-org/theme";
import { Field } from "formik";

type Props = {
  name: string;
  label: string;
  type?: "text" | "number";
  validation?: (value: any) => string | undefined;
  errors?: string;
  touched?: boolean;
  classNames?: ClassValues<"container" | "label" | "field" | "error">
}
/**
 * Wraps the Formik Field and handles error display.
 * Also allows for classNames for each part of the wrapper
 * 
 * @param {name} name The name and id used for the Formik object
 * @param {label} label The label displayed for the field
 * @param {children} children Optional children to render within the Formik Field
 * @param {validation} validation Option function to pass down to Formik Field validation
 * @param {errors} errors Optional string which should be the errors state of the Formik object
 * @param {touched} touched Optional boolean value which should be the touched state of the Formik object
 * @param {classNames} classNames Optional classNames for container, label, field, and error 
 */
const InputField = ({name, label, type, validation, errors, touched, classNames}: Props) => {
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
      type={type ?? "text"}
      id={name}
      name={name}
      validate={validation}
    />
    {errors && touched && <div className={cn("", classNames?.error)}>{errors}</div>}
  </div>
}

export default InputField;