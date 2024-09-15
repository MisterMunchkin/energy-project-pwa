import { ClassValues } from "@/lib/clsx";
import React, { Children, createContext, Dispatch, Key, ReactElement, ReactNode, useContext, useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import SelectableListItem, { SelectableListItemOption, SelectableListItemProps } from "./selectable-list-item";

type SelectableListContext<T> = {
  selected?: T;
  setSelected: Dispatch<T>;
}

const SelectableListContext = createContext<SelectableListContext<any> | null>(null);

type Props<T> = {
  defaultValue?: T;
  children?: ReactElement<SelectableListItemProps<T>> | Array<ReactElement<SelectableListItemProps<T>>>;
  classNames?: ClassValues<"container">;
  hasAll?: string;
  onSelectionChange?: (value?: T) => void;
  items?: SelectableListItemOption<T>[];
  render?: (item: SelectableListItemOption<T>, index: Key) => ReactElement<SelectableListItemProps<T>>;
}
const SelectableList = <T, >({defaultValue, children, classNames, hasAll, onSelectionChange, items, render}: Props<T>) => {
  const [selected, setSelected] = useState<T | undefined>(defaultValue);

  const hasItemsToRender = !!(items && render);

  useEffect(() => {
    onSelectionChange && onSelectionChange(selected);
  }, [onSelectionChange, selected]);

  const value = {selected, setSelected};
  return <SelectableListContext.Provider value={value}>
    <div className={cn(classNames?.container)}>
      {!hasItemsToRender && children}
      {hasItemsToRender && items.map((item, index) => render(item, index))}
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