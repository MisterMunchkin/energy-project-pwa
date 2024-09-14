import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot"
import { forwardRef, ReactNode } from "react";
import { useSelectableList } from "./selectable-list";

type Props = {
  className?: string;
  onSelectedClassName?: string;
  children: ReactNode;
  value: string | number;
}
const SelectableListItem = forwardRef<HTMLElement, Props>(({className, onSelectedClassName, children, value, ...props}: Props, forwardedRef) => {
  const {
    selected,
    setSelected
  } = useSelectableList();

  return <Slot 
    className={cn(className, (selected === value) ? onSelectedClassName : "")}
    ref={forwardedRef}
    onClick={() => setSelected(value)}
    {...props}
  >
    {children}
  </Slot>
});

export default SelectableListItem;