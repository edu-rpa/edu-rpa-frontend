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
import {
  CreateDocumentTemplateDto,
  SaveDocumentTemplateDto,
  EditDocumentTemplateDto,
} from '@/dtos/documentTemplateDto';
import CreateDocumentTemplateModal from './create-modal';
import DetailDocumentTemplateModal from './detail-modal';
import EditDocumentTemplateModal from './edit-modal';
import documentTemplateApi from '@/apis/documentTemplateApi';
import { ToolTipExplain } from '@/constants/description';

export interface DocumentTemplateListProps {
  isEditable?: boolean;
  handleSelectDocumentTemplate?: (e: any) => void;
}

export default function DocumentTemplateList(props: DocumentTemplateListProps) {
  const { isEditable = true, handleSelectDocumentTemplate = (e: any) => {} } =
    props;

  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const [documentTemplates, setDocumentTemplates] = useState<
    DocumentTemplate[]
  >([]);
  const [selectedDocumentTemplate, setSelectedDocumentTemplate] =
    useState<DocumentTemplate>();
  const [editedDocumentTemplate, setEditedDocumentTemplate] =
    useState<DocumentTemplate>();
  const [documentType, setDocumentType] = useState<DocumentTemplateType>();

  useEffect(() => {
    documentTemplateApi.getDocumentTemplates(documentType).then((res) => {
      setDocumentTemplates(res);
    });
  }, [documentType]);

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

  const handleEditDocumentTemplate = async (
    editDocumentTemplateDto: EditDocumentTemplateDto
  ) => {
    if (!editedDocumentTemplate) return;
    const res = await documentTemplateApi.editDocumentTemplate(
      editedDocumentTemplate.id,
      editDocumentTemplateDto
    );
    setDocumentTemplates(
      documentTemplates.map((documentTemplate) => {
        if (documentTemplate.id === editedDocumentTemplate.id) {
          return res;
        }
        return documentTemplate;
      })
    );
    onCloseEditModal();
  };

  const handleCreateNewDocumentTemplate = async (
    createDocumentTemplateDto: CreateDocumentTemplateDto
  ) => {
    const res = await documentTemplateApi.createDocumentTemplate(
      createDocumentTemplateDto
    );
    setDocumentTemplates([...documentTemplates, res]);
    onCloseCreateModal();
    setSelectedDocumentTemplate(res);
    onOpenDetailModal();
  };

  const handleSaveDocumentTemplate = async (
    saveDocumentTemplateDto: SaveDocumentTemplateDto
  ) => {
    if (!selectedDocumentTemplate) return;
    await documentTemplateApi.saveDocumentTemplate(
      selectedDocumentTemplate.id,
      saveDocumentTemplateDto
    );
    onCloseDetailModal();
    setSelectedDocumentTemplate(undefined);
  };

  const handleDeleteDocumentTemplate = async (documentTemplateId: string) => {
    await documentTemplateApi.deleteDocumentTemplate(documentTemplateId);
    setDocumentTemplates(
      documentTemplates.filter(
        (documentTemplate) => documentTemplate.id !== documentTemplateId
      )
    );
  };

  const handleCloseDetailModal = () => {
    onCloseDetailModal();
    setSelectedDocumentTemplate(undefined);
  };

  const handleSelectFilterType = (e) => {
    setDocumentType(e.target.value);
  };

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <div className="flex flex-start">
          <h1 className="pl-[20px] pr-[10px] ml-[35px] font-bold text-2xl text-[#319795]">
            Document Template List
          </h1>
          <Tooltip
            hasArrow
            label={ToolTipExplain.DOCUMENT_TEMPLATE_SERVICE}
            bg="gray.300"
            color="black">
            <QuestionIcon color="blue.500" />
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
              <Select onChange={(e) => handleSelectFilterType(e)}>
                <option value="">All</option>
                <option value="image">Image</option>
              </Select>
            </Box>

            {isEditable && (
              <Button colorScheme="teal" onClick={onOpenCreateModal}>
                Create
              </Button>
            )}
          </div>
        </div>

        {documentTemplates.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">No document template found</h1>
            <div className="text-gray-500">
              Create a new document template to help you automate
              document-related tasks
            </div>
          </div>
        )}

        {isEditable && (
          <CreateDocumentTemplateModal
            isOpen={isOpenCreateModal}
            onClose={onCloseCreateModal}
            handleCreateNewDocumentTemplate={handleCreateNewDocumentTemplate}
          />
        )}

        {isEditable && (
          <EditDocumentTemplateModal
            isOpen={isOpenEditModal}
            onClose={onCloseEditModal}
            documentTemplate={editedDocumentTemplate}
            handleEditDocumentTemplate={handleEditDocumentTemplate}
          />
        )}

        <DetailDocumentTemplateModal
          isOpen={isOpenDetailModal}
          onClose={handleCloseDetailModal}
          documentTemplate={selectedDocumentTemplate}
          handleSaveDocumentTemplate={handleSaveDocumentTemplate}
          isEditable={isEditable}
          handleSelectDocumentTemplate={handleSelectDocumentTemplate}
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
