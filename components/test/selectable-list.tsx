import { ClassValues } from "@/lib/clsx";
import { Children, createContext, Dispatch, Key, ReactElement, ReactNode, useContext, useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { SelectableListItemOption } from "./selectable-list-item";

type SelectableListContext<T> = {
  selected?: T;
  setSelected: Dispatch<T>;
}

const SelectableListContext = createContext<SelectableListContext<any> | null>(null);

type Props<T> = {
  options: {label: string, value?: T}[];
  defaultValue?: T;
  children: ((option: {label: string, value?: T}, key?: Key | null | undefined) => ReactNode);
  classNames?: ClassValues<"container" | "item" | "onSelected">;
  hasAll?: string;
}
const SelectableList = <T, >({options, defaultValue, children, classNames, hasAll}: Props<T>) => {
  // const childArray = Children.toArray(children); 
  const [selected, setSelected] = useState<T | undefined>(defaultValue);


  const value = {selected, setSelected};
  return <SelectableListContext.Provider value={value}>
    <div className={cn(classNames?.container)}>
      {/* TODO: This one enforces SelectableListItem */}
      {/* {hasAll && (
        <SelectableListItem
          className={cn(classNames?.item)}
          onSelectedClassName={cn(classNames?.onSelected)}
        >
          {children({label: hasAll, }, "")}
        </SelectableListItem>
      )}
      {options.map((option, index) => (
        <SelectableListItem
          key={index}
          value={option.value}
          className={cn(classNames?.item)}
          onSelectedClassName={cn(classNames?.onSelected)}
        >
          {children(option, index)}
        </SelectableListItem>
      ))}
      {JSON.stringify(selected)} */}
      {hasAll && children({label: hasAll, value: undefined}, "")}
      {options.map((option, index) => children(option, index))}
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