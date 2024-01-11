import { EditDocumentTemplateDto } from "@/dtos/documentTemplateDto";
import { DocumentTemplate } from "@/interfaces/document-template";
import { DocumentTemplateType } from "@/interfaces/enums/document-template-type"
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
import { use, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  documentTemplate?: DocumentTemplate;
  handleEditDocumentTemplate: (editDocumentTemplateDto: EditDocumentTemplateDto) => void;
}

const EditDocumentTemplateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  documentTemplate,
  handleEditDocumentTemplate,
}) => {
  const [editDocumentTemplate, setEditDocumentTemplate] = useState<EditDocumentTemplateDto>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (documentTemplate) {
      setEditDocumentTemplate({
        name: documentTemplate.name,
        description: documentTemplate.description,
      });
    }
  }, [documentTemplate]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit document template</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Document template name</FormLabel>
            <Input
              placeholder="Document template name"
              value={editDocumentTemplate.name}
              onChange={(e) => setEditDocumentTemplate({ ...editDocumentTemplate, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              value={editDocumentTemplate.description}
              onChange={(e) => setEditDocumentTemplate({ ...editDocumentTemplate, description: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              value={documentTemplate?.type || DocumentTemplateType.IMAGE}
              disabled>
              <option value={DocumentTemplateType.IMAGE}>Image</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => handleEditDocumentTemplate(editDocumentTemplate)}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditDocumentTemplateModal;