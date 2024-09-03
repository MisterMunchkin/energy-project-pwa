import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { FC, ReactNode } from "react";

/**
 * The type ModalTriggerComponents will have to follow to use this wrapper
 */
export type ModalTriggerComponentType = {
  onOpen: () => void;
}
/**
 * The type FooterComponent will have to follow to use this wrapper.
 */
export type ModalFooterComponentType<T extends Object> = {
  onClose: () => void;
  onSubmit?: () => void;
  extraProps?: Partial<T>;
}

type Props<TextraFooterProps extends Object> = {
  title: string;
  children: ReactNode;
  FooterComponent: FC<ModalFooterComponentType<TextraFooterProps>>;
  ModalTriggerComponent: FC<ModalTriggerComponentType>;
  onSubmit?: () => void;
  extraFooterComponentProps?: TextraFooterProps
}
/**
 * Wraps the children into the ModalContent and handles 
 * the boilerplate that comes with NextUI Modals
 * 
 * Requires a FooterComponent to handle onClose and a ModalTriggerComponent
 * to handle onOpen.
 * 
 * @param {string} title The header of the modal
 * @param {ReactNode} children The ReactNode rendered within the ModalBody
 * @param {FC<ModalFooterComponentType>} FooterComponent The Functional Component that will be rendered within the ModalFooter
 * @param {FC<ModalTriggerComponentType>} ModalTriggerComponent The Functional Component that will trigger the opening of the modal
 * @param {() => void} onSubmit An optional function that gets called if onSubmit is actioned within the FooterComponent
 * @param {ExtraFooterComponentType} extraFooterComponentProps An optional dynamic object that can 
 */
const ModalWrapper = <T extends Object,>({title, children, FooterComponent, ModalTriggerComponent, onSubmit, extraFooterComponentProps}: Props<T>) => {
  const {
    isOpen,
    onOpen,
    onOpenChange,
  } = useDisclosure();
  
  return (
    <>
      <ModalTriggerComponent 
        onOpen={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {title}
              </ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <FooterComponent 
                  onClose={onClose}
                  onSubmit={onSubmit}
                  // {...(extraFooterComponentProps ? extraFooterComponentProps : {})}
                  extraProps={extraFooterComponentProps}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalWrapper;