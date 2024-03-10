import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  Button,
  Input
} from "@chakra-ui/react"
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  handleCreateFolder: (folderName: string) => void;
}

const CreateFolderModal: React.FC<Props> = ({
  isOpen,
  isLoading,
  onClose,
  handleCreateFolder,
}) => {
  const [folderName, setFolderName] = useState<string>('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create folder</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Folder name</FormLabel>
            <Input
              placeholder="Folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={!folderName || isLoading}
            isLoading={isLoading}
            onClick={() => handleCreateFolder(folderName)}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateFolderModal;