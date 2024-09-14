import { createContext, Dispatch, ReactNode, useContext, useState } from "react";

type SelectableListContext<T> = {
  selected?: T;
  setSelected: Dispatch<T>;
}
// const SelectableListContext = createContext<SelectableListContext | null>(null);

const createSelectableListContext = <T, >() => {
  return createContext<SelectableListContext<T> | null>(null);
}

type Props<T> = {
  defaultValue?: T;
  valueType: T;
  children: ReactNode | ((value: SelectableListContext<T>) => ReactNode);
}
const SelectableListProvider = <T, >({children, defaultValue,}: Props<T>) => {
  const [selected, setSelected] = useState<T | undefined>(defaultValue);

  const value = {selected, setSelected};
  const SelectableListContext = createSelectableListContext<T>();

  return <SelectableListContext.Provider value={value}>
    {(typeof children === "function") ? children(value) : children}
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