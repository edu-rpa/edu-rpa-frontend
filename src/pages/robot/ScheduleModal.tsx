import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button 
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  processId: string;
  processVersion: number;
}

export const ScheduleModal = ({
  isOpen,
  onClose,
  userId,
  processId,
  processVersion,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Schedule robot</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}