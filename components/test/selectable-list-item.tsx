import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot"
import { forwardRef, ReactNode, Ref } from "react";
import { useSelectableList } from "./selectable-list";

type Props<T> = {
  className?: string;
  onSelectedClassName?: string;
  children: ReactNode;
  value: T;
}
// interface WithForwardRefType extends React.FC<WithForwardRefProps<Option>>  {
//   <T extends Option>(props: WithForwardRefProps<T>): ReturnType<React.FC<WithForwardRefProps<T>>>
// }

const Comp = <T, >({className, onSelectedClassName, children, value, ...props}: Props<T>) => {
  const {
    selected,
    setSelected
  } = useSelectableList(value);

  return <Slot 
    className={cn(className, (selected === value) ? onSelectedClassName : "")}
    // ref={ref} TODO: unable to create generics with forward refs
    onClick={() => setSelected(value)}
    {...props}
  >
    {children}
  </Slot>
}

const SelectableListItem = Comp;

export default SelectableListItem;