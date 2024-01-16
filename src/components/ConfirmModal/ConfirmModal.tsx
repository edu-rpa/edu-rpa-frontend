import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

interface Props {
  title: string;
  content: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  title,
  content,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Are you sure you want to: {content}?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            disabled={isLoading}
            isLoading={isLoading}
            onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="outline" colorScheme="teal" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
