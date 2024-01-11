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
  Tooltip,
} from '@chakra-ui/react';
import { SearchIcon, QuestionIcon } from '@chakra-ui/icons';
import CustomTable from '@/components/CustomTable/CustomTable';
import { DocumentTemplate } from '@/interfaces/document-template';
import { DocumentTemplateType } from '@/interfaces/enums/document-template-type';
import { CreateDocumentTemplateDto, SaveDocumentTemplateDto, EditDocumentTemplateDto } from '@/dtos/documentTemplateDto';
import CreateDocumentTemplateModal from './create-modal';
import DetailDocumentTemplateModal from './detail-modal';
import EditDocumentTemplateModal from './edit-modal';
import documentTemplateApi from '@/apis/documentTemplateApi';

const documentTemplateExplain = 'Document template is a template that contains the information of the document that you want to extract.';

export default function DocumentTemplateList() {
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

  const [documentTemplates, setDocumentTemplates] = useState<DocumentTemplate[]>([]);
  const [selectedDocumentTemplate, setSelectedDocumentTemplate] = useState<DocumentTemplate>();
  const [editedDocumentTemplate, setEditedDocumentTemplate] = useState<DocumentTemplate>();

  useEffect(() => {
    documentTemplateApi.getDocumentTemplates().then((res) => {
      setDocumentTemplates(res);
    });
  }, []);

  const tableProps = {
    header: ['ID', 'Name', 'Description', 'Type', 'Actions'],
    data: documentTemplates.map((documentTemplate) => ({
      id: documentTemplate.id,
      name: documentTemplate.name,
      description: documentTemplate.description,
      type: documentTemplate.type,
    })),
  };

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

  const handleEditDocumentTemplate = async (editDocumentTemplateDto: EditDocumentTemplateDto) => {
    if (!editedDocumentTemplate) return;
    const res = await documentTemplateApi.editDocumentTemplate(editedDocumentTemplate.id, editDocumentTemplateDto);
    setDocumentTemplates(documentTemplates.map((documentTemplate) => {
      if (documentTemplate.id === editedDocumentTemplate.id) {
        return res;
      }
      return documentTemplate;
    }));
    onCloseEditModal();
  };

  const handleCreateNewDocumentTemplate = async (createDocumentTemplateDto: CreateDocumentTemplateDto) => {
    const res = await documentTemplateApi.createDocumentTemplate(createDocumentTemplateDto);
    setDocumentTemplates([...documentTemplates, res]);
    onCloseCreateModal();
    setSelectedDocumentTemplate(res);
    onOpenDetailModal();
  };

  const handleSaveDocumentTemplate = async (saveDocumentTemplateDto: SaveDocumentTemplateDto) => {
    if (!selectedDocumentTemplate) return;
    await documentTemplateApi.saveDocumentTemplate(selectedDocumentTemplate.id, saveDocumentTemplateDto);
    onCloseDetailModal();
  };

  const handleDeleteDocumentTemplate = async (documentTemplateId: string) => {
    await documentTemplateApi.deleteDocumentTemplate(documentTemplateId);
    setDocumentTemplates(documentTemplates.filter((documentTemplate) => documentTemplate.id !== documentTemplateId));
  };

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <div className="flex flex-start">
          <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
            Document Template List
          </h1>
          <Tooltip hasArrow label={documentTemplateExplain} bg='gray.300' color='black'>
            <QuestionIcon />
          </Tooltip>
        </div>

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
                <option value="image">Image</option>
              </Select>
            </Box>

            <Button colorScheme="teal" onClick={onOpenCreateModal}>Create</Button>
          </div>
        </div>

        {documentTemplates.length === 0 && (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl">No document template found</h1>
          </div>
        )}

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
            onDelete={handleDeleteDocumentTemplate}
          />
        </div>
      </SidebarContent>
    </div>
  );
}
