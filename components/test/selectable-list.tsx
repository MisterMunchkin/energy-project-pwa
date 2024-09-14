import { createContext, Dispatch, ReactNode, Ref, useContext, useImperativeHandle, useReducer, useState } from "react";

interface SelectState {
  selected?: string | number;
}

interface SelectAction {
  payload: string | number
}

type SelectableListContext = {
  selected: string | number | undefined;
  setSelected: Dispatch<string | number | undefined>;
}
const SelectableListContext = createContext<SelectableListContext | null>(null);

const selectReducer = (state: SelectState, action: SelectAction) => {
  const {
    payload
  } = action;

  return { selected: payload };
}

type Props = {
  defaultValue?: string | number;
  
  children: (value: SelectableListContext) => ReactNode;
}
const SelectableListProvider = ({children, defaultValue,}: Props) => {
  // const [state, dispatch] = useReducer(selectReducer, { selected: defaultValue ?? ""});
  const [selected, setSelected] = useState<string | number | undefined>(defaultValue);

  // const value = {selected: state.selected, setSelected: dispatch};
  const value = {selected, setSelected};
  return <SelectableListContext.Provider value={value}>
    {children(value)}
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