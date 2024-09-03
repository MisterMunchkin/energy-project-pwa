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
export type ModalFooterComponentType = {
  onClose: () => void;
  onSubmit?: () => void;
}
type Props = {
  title: string;
  children: ReactNode;
  FooterComponent: FC<ModalFooterComponentType>;
  ModalTriggerComponent: FC<ModalTriggerComponentType>;
  onSubmit?: () => void;
}
/**
 * Wraps the children into the ModalContent and handles 
 * the boilerplate that comes with NextUI Modals
 * 
 * Requires a FooterComponent to handle onClose and a ModalTriggerComponent
 * to handle onOpen.
 * 
 * @param {title} title The header of the modal
 * @param {children} children The ReactNode rendered within the ModalBody
 * @param {FooterComponent} FooterComponent The Functional Component that will be rendered within the ModalFooter
 * @param {ModalTriggerComponent} ModalTriggerComponent The Functional Component that will trigger the opening of the modal
 * @param {onSubmit} onSubmit An optional function that gets called if onSubmit is actioned within the FooterComponent
 */
const ModalWrapper = ({title, children, FooterComponent, ModalTriggerComponent, onSubmit}: Props) => {
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