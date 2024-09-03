import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Key, ReactNode } from "react";

export type SimpleDropdownItemType = {
  display: string;
  props: {
    key: string;
    description?: string
    startContent?: ReactNode;
    className?: string;
  }
}
type Props = {
  trigger: ReactNode
  ariaLabel: string;
  simpleMenuItems: SimpleDropdownItemType[]; 
  onAction: (key: Key) => void;
}
const DropdownWrapper = ({trigger, ariaLabel, simpleMenuItems, onAction}: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        {trigger}
      </DropdownTrigger>
      <DropdownMenu 
        aria-label={ariaLabel}
        onAction={onAction}
      >
        {simpleMenuItems.map(({display, props: {key, ...optionalProps}}) => (
          <DropdownItem
            key={key}
            {...optionalProps}
          >{display}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownWrapper;
