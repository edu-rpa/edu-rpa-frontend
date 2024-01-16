import { CreateDocumentTemplateDto } from '@/dtos/documentTemplateDto';
import { DocumentTemplateType } from '@/interfaces/enums/document-template-type';
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
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleCreateNewDocumentTemplate: (
    createDocumentTemplateDto: CreateDocumentTemplateDto
  ) => void;
}

const CreateDocumentTemplateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  handleCreateNewDocumentTemplate,
}) => {
  const [createDocumentTemplate, setCreateDocumentTemplate] =
    useState<CreateDocumentTemplateDto>({
      name: '',
      description: '',
      type: DocumentTemplateType.IMAGE,
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new document template</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Document template name</FormLabel>
            <Input
              placeholder="Document template name"
              value={createDocumentTemplate.name}
              onChange={(e) =>
                setCreateDocumentTemplate({
                  ...createDocumentTemplate,
                  name: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              value={createDocumentTemplate.description}
              onChange={(e) =>
                setCreateDocumentTemplate({
                  ...createDocumentTemplate,
                  description: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              value={createDocumentTemplate.type}
              onChange={(e) =>
                setCreateDocumentTemplate({
                  ...createDocumentTemplate,
                  type: e.target.value as DocumentTemplateType,
                })
              }>
              <option value={DocumentTemplateType.IMAGE}>Image</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() =>
              handleCreateNewDocumentTemplate(createDocumentTemplate)
            }>
            Create
          </Button>
          <Button variant="outline" colorScheme="teal" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateDocumentTemplateModal;
