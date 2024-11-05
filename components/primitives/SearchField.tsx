import { cn } from "@/lib/cn";
import { ClassValues } from "@/lib/clsx";
import debounce from "lodash.debounce";

type Props = {
  debounceTime?: number;
  onChange: (value: string) => void;
  classNames?: ClassValues<"container" | "label" | "field">;
  label?: string;
  name: string;
  placeholder: string;
};

/**
 *
 * @param {number} debounceTime sets a debounce for the text input so it doesnt create search request at the speed of the type
 * @param {() => string} onChange event handler for when input text changes
 * @param {string} classNames ClassValues that can be customized: "container", "label", "field". See clsx.ts and cn.ts comments
 * @param {string} label Handles the input label optionally
 * @param {string} name required name prop for input element
 *
 * @returns {ReactNode}
 */
const SearchField = ({
  debounceTime,
  onChange,
  classNames,
  label,
  name,
  placeholder,
}: Props) => {
  const handleChange = debounce(onChange, debounceTime ?? 300);

  return (
    <div className={cn("default-field-container", classNames?.container)}>
      {label && (
        <label htmlFor="name" className={cn("", classNames?.label)}>
          {label}
        </label>
      )}
      <input
        className={cn("default-field", classNames?.field)}
        type={"text"}
        id={name}
        name={name}
        onChange={({ target: { value } }: { target: { value: string } }) =>
          handleChange(value)
        }
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchField;
