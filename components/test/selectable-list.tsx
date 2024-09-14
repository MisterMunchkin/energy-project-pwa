import { ClassValues } from "@/lib/clsx";
import { createContext, Dispatch, ReactNode, useContext, useState } from "react";
import { SelectableListItem } from "./selectable-list-item";
import { cn } from "@/lib/cn";

type SelectableListContext<T> = {
  selected?: T;
  setSelected: Dispatch<T>;
}

const createSelectableListContext = <T, >() => {
  return createContext<SelectableListContext<T> | null>(null);
}

type Props<T> = {
  defaultValue?: T;
  options: SelectableListItem<T>[];
  children: ReactNode | ((value: SelectableListContext<T>) => ReactNode);
  classNames?: ClassValues<"container" | "item">
}
const SelectableListProvider = <T, >({children, defaultValue, options, classNames}: Props<T>) => {
  const [selected, setSelected] = useState<T | undefined>(defaultValue);

  const value = {selected, setSelected};
  const SelectableListContext = createSelectableListContext<T>();

  return <SelectableListContext.Provider value={value}>
    <div className={cn(classNames?.container)}>
      {children && (typeof children === "function") ? children(value) : children}
    </div>
  </SelectableListContext.Provider>
}

const useSelectableList = <T, >(valueType: T) => {
  const data = useContext(createSelectableListContext<typeof valueType>());
  if (data === null)
    throw new Error('This hook should be used inside SelectableListComponent');
  return data;
}

export {
  SelectableListProvider,
  useSelectableList
}