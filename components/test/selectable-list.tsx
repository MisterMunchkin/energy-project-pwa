import { createContext, Dispatch, ReactNode, useContext, useState } from "react";

type SelectableListContext = {
  selected: string | number | undefined;
  setSelected: Dispatch<string | number | undefined>;
}
const SelectableListContext = createContext<SelectableListContext | null>(null);

type Props = {
  defaultValue?: string | number;
  children: ReactNode | ((value: SelectableListContext) => ReactNode);
}
const SelectableListProvider = ({children, defaultValue,}: Props) => {
  const [selected, setSelected] = useState<string | number | undefined>(defaultValue);

  const value = {selected, setSelected};
  return <SelectableListContext.Provider value={value}>
    {(typeof children === "function") ? children(value) : children}
  </SelectableListContext.Provider>
}

const useSelectableList = () => {
  const data = useContext(SelectableListContext);
  if (data === null)
    throw new Error('This hook should be used inside SelectableListComponent');
  return data;
}

export {
  SelectableListProvider,
  useSelectableList
}