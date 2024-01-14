import { formatDate } from '@/utils/common';
import React, { useEffect, useState } from 'react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import FileItem from './FileItem';
import {
  getFiles,
  createFolder,
} from '@/apis/fileStorageApi';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CreateFolderModal from './CreateFolderModal';

export default function Storage() {
  const [files, setFiles] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCreateFolder, setIsLoadingCreateFolder] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  const { 
    isOpen: isOpenCreateFolderModal, 
    onOpen: onOpenCreateFolderModal, 
    onClose: onCloseCreateFolderModal 
  } = useDisclosure();

  const handleCreateFolder = (folderName: string) => {
    setIsLoadingCreateFolder(true);
    createFolder(`${currentPath}${folderName}/`)
      .then(() => {
        onCloseCreateFolderModal();
        setCurrentPath(`${currentPath}${folderName}/`);
      })
      .finally(() => {
        setIsLoadingCreateFolder(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getFiles(currentPath)
      .then((res) => {
        setFiles(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getFiles(currentPath)
      .then((res) => {
        setFiles(res.filter((file) => file !== ''));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPath]);

  const handleFileItemClick = (name: string) => {
    if (name.endsWith('/')) {
      setCurrentPath(`${currentPath}${name}`);
    } else {
      console.log('open file', name);
    }
  };

  const handleClickUpload = () => {
    console.log('upload file');
  };

  const handleClickCreateFolder = () => {
    onOpenCreateFolderModal();
  };

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          File Storage
        </h1>
        <Breadcrumb
          separator={<ChevronRightIcon color='gray.500' />}
          spacing="8px"
          className='px-[20px] ml-[35px] mt-[20px]'
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              color="#319795"
              onClick={() => {
                setCurrentPath('');
              }}
            >
              /
            </BreadcrumbLink>
          </BreadcrumbItem>
          {currentPath.split('/').map((path, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                color="#319795"
                onClick={() => {
                  setCurrentPath(currentPath.split('/').slice(0, index + 1).join('/'));
                }}
              >
                {path}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <div className="flex justify-between w-90 mx-auto my-[30px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              width="20vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
          </InputGroup>

          <div className="flex justify-between gap-[10px]">
            <Box className="w-[21vw]">
              <RangeDatepicker
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
              />
            </Box>
            <Box className="w-[10vw]">
              <Select defaultValue="all">
                <option value="google-sheet">Google Sheet</option>
                <option value="pdf">PDF</option>
                <option value="google-docs">Google Docs</option>
                <option value="image">Image</option>
                <option value="all">All</option>
              </Select>
            </Box>
            <IconButton
              colorScheme='teal'
              aria-label='Upload File'
              size='lg'
              icon={<CloudUploadIcon />}
              onClick={handleClickUpload}
            />
            <IconButton
              colorScheme='teal'
              aria-label='Create Folder'
              size='lg'
              icon={<CreateNewFolderIcon />}
              onClick={handleClickCreateFolder}
            />
          </div>
        </div>

        <CreateFolderModal
          isOpen={isOpenCreateFolderModal}
          isLoading={isLoadingCreateFolder}
          onClose={onCloseCreateFolderModal}
          handleCreateFolder={handleCreateFolder}
        />

        {isLoading
          ? <div className="w-90 m-auto flex justify-center items-center">
            <Button colorScheme="teal" disabled className='m-auto' isLoading>Loading...</Button>
          </div>
          : <div className="w-90 m-auto">
            <div className="grid grid-cols-4 gap-4">
              {files.map((file) => (
                <FileItem
                  key={file}
                  name={file}
                  onClick={handleFileItemClick}
                />
              ))}
            </div>
          </div>
        }

        {files.length === 0 && !isLoading && (
          <div className="w-90 m-auto flex justify-center items-center">
            <div className="text-center">
              <div className="text-2xl font-bold">No files here</div>
              <div className="text-gray-500">Upload or create a new one</div>
            </div>
          </div>
        )}
      </SidebarContent>
    </div>
  );
}
