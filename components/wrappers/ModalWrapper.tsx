import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { FC, ReactNode } from "react";

export type ModalTriggerComponentType = {
  onOpen: () => void;
}
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