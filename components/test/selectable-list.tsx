import { ClassValues } from "@/lib/clsx";
import React, { Children, createContext, Dispatch, Key, ReactElement, ReactNode, useContext, useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import SelectableListItem, { SelectableListItemProps } from "./selectable-list-item";

type SelectableListContext<T> = {
  selected?: T;
  setSelected: Dispatch<T>;
}

const SelectableListContext = createContext<SelectableListContext<any> | null>(null);

type Props<T> = {
  // options?: {label: string, value?: T}[];
  defaultValue?: T;
  // children: ReactNode | ((option: {label: string, value?: T}, key?: Key | null | undefined) => ReactNode);
  children: ReactElement<SelectableListItemProps<T>> | Array<ReactElement<SelectableListItemProps<T>>>;
  classNames?: ClassValues<"container">;
  hasAll?: string;
}
const SelectableList = <T, >({defaultValue, children, classNames, hasAll}: Props<T>) => {
  const [selected, setSelected] = useState<T | undefined>(defaultValue);
  const hasAllEl: React.FunctionComponent<SelectableListItemProps<T>> = (props) => {
    return <SelectableListItem
      key={undefined}
      value={undefined}
      
      {...props}
    />
  }

  const value = {selected, setSelected};
  return <SelectableListContext.Provider value={value}>
    <div className={cn(classNames?.container)}>
      {children}
    </div>
  </SelectableListContext.Provider>
}

const useSelectableList = <T, >() => {
  const data = useContext(SelectableListContext);
  if (data === null)
    throw new Error('This hook should be used inside SelectableListComponent');
  
  //TODO: don't like the `as` but without it, we would need to pass T to createContext
  return data as SelectableListContext<T>;
}

export {
  SelectableList,
  useSelectableList
}