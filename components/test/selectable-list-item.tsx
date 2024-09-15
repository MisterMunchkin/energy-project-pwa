import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot"
import React, { forwardRef, ReactNode, Ref } from "react";
import { useSelectableList } from "./selectable-list";

export type SelectableListItemOption<T> = {
  label: string;
  value?: T
}

type Props<T> = {
  className?: string;
  onSelectedClassName?: string;
  children: ReactNode;
  onSelect: (value?: T) => void;
  value?: T;
}

const Comp = <T, >({onSelect, className, onSelectedClassName, children, value, ...props}: Props<T>, ref?: React.Ref<HTMLElement>) => {
  const {
    selected,
  } = useSelectableList();

  return <Slot 
    className={cn(className, (selected === value) ? onSelectedClassName : "")}
    ref={ref} 
    onClick={() => onSelect(value)}
    {...props}
  >
    {children}
  </Slot>
}

//TODO: Generics within forwardRef comes back as `unknown` instead of the inferred T type
// using `as` to keep forwardRef but still having generic T.
const SelectableListItem = forwardRef(Comp) as <T,>(
  props: Props<T> & { ref?: React.Ref<HTMLElement>}
) => ReturnType<typeof Comp>;


export default SelectableListItem;