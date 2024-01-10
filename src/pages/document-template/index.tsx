import React, { useEffect, useRef, useState } from 'react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CustomTable from '@/components/CustomTable/CustomTable';
import { DocumentTemplate } from '@/interfaces/document-template';
import { DocumentTemplateType } from '@/interfaces/enums/document-template-type';
import { CreateDocumentTemplateDto, SaveDocumentTemplateDto, EditDocumentTemplateDto } from '@/dtos/documentTemplateDto';
import CreateDocumentTemplateModal from './create-modal';
import DetailDocumentTemplateModal from './detail-modal';
import EditDocumentTemplateModal from './edit-modal';

const documentTemplates: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Document Template 1',
    description: 'Description 1',
    type: DocumentTemplateType.PDF,
    isSampleUploaded: true,
  },
  {
    id: '2',
    name: 'Document Template 2',
    description: 'Description 2',
    type: DocumentTemplateType.IMAGE,
    isSampleUploaded: false,
  },
];

export default function DocumentTemplateList() {
  const tableProps = {
    header: ['ID', 'Name', 'Description', 'Type', 'Note', 'Actions'],
    data: documentTemplates.map((documentTemplate) => ({
      id: documentTemplate.id,
      name: documentTemplate.name,
      description: documentTemplate.description,
      type: documentTemplate.type,
      note: documentTemplate.isSampleUploaded ? '' : (
        <span className="text-red-500">No sample document uploaded</span>
      ),
    })),
  };

  const { 
    isOpen: isOpenCreateModal, 
    onOpen: onOpenCreateModal, 
    onClose: onCloseCreateModal 
  } = useDisclosure();
  const { 
    isOpen: isOpenDetailModal, 
    onOpen: onOpenDetailModal, 
    onClose: onCloseDetailModal 
  } = useDisclosure();
  const { 
    isOpen: isOpenEditModal, 
    onOpen: onOpenEditModal, 
    onClose: onCloseEditModal 
  } = useDisclosure();

  const [selectedDocumentTemplate, setSelectedDocumentTemplate] = useState<DocumentTemplate>();
  const [editedDocumentTemplate, setEditedDocumentTemplate] = useState<DocumentTemplate>();

  const handleViewDocumentTemplate = (documentTemplateId: string) => {
    const selectedDocumentTemplate = documentTemplates.find(
      (documentTemplate) => documentTemplate.id === documentTemplateId
    );
    if (selectedDocumentTemplate) {
      setSelectedDocumentTemplate(selectedDocumentTemplate);
      onOpenDetailModal();
    }
  };

  const handleSelectEditDocumentTemplate = (documentTemplateId: string) => {
    const selectedDocumentTemplate = documentTemplates.find(
      (documentTemplate) => documentTemplate.id === documentTemplateId
    );
    if (selectedDocumentTemplate) {
      setEditedDocumentTemplate(selectedDocumentTemplate);
      onOpenEditModal();
    }
  };

  const handleEditDocumentTemplate = (editDocumentTemplateDto: EditDocumentTemplateDto) => {
    console.log(editDocumentTemplateDto);
    onCloseEditModal();
  };

  const handleCreateNewDocumentTemplate = (createDocumentTemplateDto: CreateDocumentTemplateDto) => {
    console.log(createDocumentTemplateDto);
    onCloseCreateModal();
    setSelectedDocumentTemplate(undefined);
    onOpenDetailModal();
  };

  const handleSaveDocumentTemplate = (saveDocumentTemplateDto: SaveDocumentTemplateDto) => {
    console.log(saveDocumentTemplateDto);
    onCloseDetailModal();
  };

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Document Template List
        </h1>
        <div className="flex justify-between w-90 mx-auto my-[30px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              width="30vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
          </InputGroup>

          <div className="flex justify-between gap-[5px]">
            <Box className="w-[10vw]">
              <Select defaultValue="all">
                <option value="all">All</option>
                <option value="pdf">PDF</option>
                <option value="image">Image</option>
              </Select>
            </Box>

            <Button colorScheme="teal" onClick={onOpenCreateModal}>Create</Button>
          </div>
        </div>

        <CreateDocumentTemplateModal
          isOpen={isOpenCreateModal}
          onClose={onCloseCreateModal}
          handleCreateNewDocumentTemplate={handleCreateNewDocumentTemplate}
        />

        <DetailDocumentTemplateModal
          isOpen={isOpenDetailModal}
          onClose={onCloseDetailModal}
          documentTemplate={selectedDocumentTemplate}
          handleSaveDocumentTemplate={handleSaveDocumentTemplate}
        />

        <EditDocumentTemplateModal
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
          documentTemplate={editedDocumentTemplate}
          handleEditDocumentTemplate={handleEditDocumentTemplate}
        />

        <div className="w-90 m-auto">
          <CustomTable
            header={tableProps.header}
            data={tableProps.data}
            onView={handleViewDocumentTemplate}
            onEdit={handleSelectEditDocumentTemplate}
            onDelete={() => {}}
          />
        </div>
      </SidebarContent>
    </div>
  );
}
