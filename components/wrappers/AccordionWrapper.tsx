import { ClassValues } from "@/lib/clsx";
import { cn } from "@/lib/cn";
import { Accordion, AccordionItem, AccordionProps } from "@nextui-org/accordion";

import { ReactNode } from "react";

type SimpleAccordionItemType = {
  accordions: {
    title: string;
    content: ReactNode;
  }[];
  classNames?: ClassValues<"item">;
} & Omit<AccordionProps, "children">;

const AccordionWrapper = ({accordions, classNames, ...props}: SimpleAccordionItemType) => {
  return <Accordion 
    {...props}
  >
    {accordions.map(({title, content}, index) => (
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
}

export default AccordionWrapper;