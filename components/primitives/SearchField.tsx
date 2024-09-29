import { cn } from "@/lib/cn";
import { ClassValues } from "@/lib/clsx";
import debounce from "lodash.debounce";

type Props = {
  debounceTime?: number;
  onChange: (value: string) => void;
  defaultValue?: string;
  classNames?: ClassValues<"container" | "label" | "field">;
  label?: string;
  name: string;
  placeholder: string
};

const SearchField = ({debounceTime, onChange, defaultValue, classNames, label, name, placeholder}: Props) => {
  const handleChange = debounce(onChange, debounceTime ?? 300);

  return <div className={cn("default-field-container", classNames?.container)}>
    {label && (
      <label htmlFor="name" 
        className={cn(
          "",
          classNames?.label
        )}
      >
        {label}
      </label>
    )}
    <input 
      className={cn("default-field", classNames?.field)}
      type={"text"}
      id={name}
      name={name}
      onChange={({target: {value}}: { target: { value: string; }; }) => handleChange(value)}
      placeholder={placeholder}
    />
  </div>
}

export default SearchField;