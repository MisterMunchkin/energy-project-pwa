import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key, ReactNode } from "react";

/**
 * types that users of DropdownWrapper has to follow to properly render dropdown item
 */
export type SimpleDropdownItemType = {
  display: string;
  props: {
    key: string;
    description?: string;
    startContent?: ReactNode;
    className?: string;
  };
};
type Props = {
  trigger: ReactNode;
  ariaLabel: string;
  simpleMenuItems: SimpleDropdownItemType[];
  onAction: (key: Key) => void;
};
/**
 *
 * @param {ReactNode} trigger A ReactNode that is rendered as the dropdown trigger
 * @param {string} ariaLabel Used for accessibility reasons
 * @param {object[]} simpleMenuItems Menu items that are rendered as drop down items
 * @param {Key} onAction Handler for onAction event of the Dropdown Menu
 * @returns
 */
const DropdownWrapper = ({
  trigger,
  ariaLabel,
  simpleMenuItems,
  onAction,
}: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu aria-label={ariaLabel} onAction={onAction}>
        {simpleMenuItems.map(
          ({ display, props: { key, ...optionalProps } }) => (
            <DropdownItem key={key} {...optionalProps}>
              {display}
            </DropdownItem>
          ),
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownWrapper;
