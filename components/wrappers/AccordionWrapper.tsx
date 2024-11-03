import { ClassValues } from "@/lib/clsx";
import { cn } from "@/lib/cn";
import {
  Accordion,
  AccordionItem,
  AccordionProps,
} from "@nextui-org/accordion";

import { ReactNode } from "react";

type SimpleAccordionItemType = {
  accordions: {
    title: string;
    content: ReactNode;
  }[];
  classNames?: ClassValues<"item">;
} & Omit<AccordionProps, "children">;

/**
 * Ommits children because this is handled by our AccordionWrapper.
 * Wrappers like this just abstracts the component. Instead of using 3 separate components
 * to create this Accordion, it is now just 1.
 *
 * This might seem counter intuitive, like why does a library like nextui make you jump through
 * so much hoops to build a simple accordion, but its for flexibility. We can think of this like
 * building blocks or legos. Nextui gives us these building blocks with accessibility and standards baked in,
 *  and we can choose how abstract or verbose we would like our components to be.
 *
 * @param accordions list of accordion UI to render with title and content within
 * @param classNames ClassValues that can overwrite default classNames of "item"
 *
 * @returns
 */
const AccordionWrapper = ({
  accordions,
  classNames,
  ...props
}: SimpleAccordionItemType) => {
  return (
    <Accordion {...props}>
      {accordions.map(({ title, content }, index) => (
        <AccordionItem
          className={cn(classNames?.item)}
          key={index}
          aria-label={title}
          title={title}
        >
          {content}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionWrapper;
