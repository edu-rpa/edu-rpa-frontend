import CustomTable from '@/components/CustomTable/CustomTable';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import TemplateCard from '@/components/TemplateCard/TemplateCard';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';
import { Process } from '@/types/process';
import { exportFile, formatDate } from '@/utils/common';
import { VariableItem } from '@/types/variable';
import {
  defaultXML,
  deleteProcessById,
  generateProcessID,
  getProcessFromLocalStorage,
  initProcess,
} from '@/utils/processService';
import { useRouter } from 'next/router';
import { deleteVariableById } from '@/utils/variableService';

export default function Studio() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const [processList, setProcessList] = useState([]);

  useEffect(() => {
    const getProcessStorage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
    if (!getProcessStorage) {
      localStorage.setItem(LocalStorage.PROCESS_LIST, JSON.stringify([]));
    } else {
      console.log('Process Storage', getProcessStorage);
      setProcessList(getProcessStorage);
    }
  }, []);

  useEffect(() => {
    const variableStorage = localStorage.getItem(LocalStorage.VARIABLE_LIST);
    if (!variableStorage) {
      localStorage.setItem(LocalStorage.VARIABLE_LIST, JSON.stringify([]));
    } else {
      const processStorage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
      const variableStorage = getLocalStorageObject(LocalStorage.VARIABLE_LIST);
      const processList = processStorage.map((item: Process) => item.processID);
      const filteredVariableStorage = variableStorage.filter(
        (variable: VariableItem) => processList.includes(variable.processID)
      );
      setLocalStorageObject(
        LocalStorage.VARIABLE_LIST,
        filteredVariableStorage
      );
      console.log(
        'Variable Storage',
        getLocalStorageObject(LocalStorage.VARIABLE_LIST)
      );
    }
  }, []);

  const handleCreateNewProcess = () => {
    const processID = generateProcessID();
    const xml = defaultXML(processID);
    const initialProcess = initProcess(
      processID,
      xml,
      initialRef.current?.value as string
    );
    setLocalStorageObject(LocalStorage.PROCESS_LIST, [
      ...processList,
      initialProcess,
    ]);
    router.push(`/studio/modeler/${processID}`);
  };

  const formatData =
    processList &&
    processList.map((item: Process) => {
      return {
        id: item.processID,
        name: item.processName,
        owner: 'You',
        last_modified: formatDate(new Date()),
      };
    });

  const handleDeleteProcessByID = (processID: string) => {
    const processListAfterDelete = deleteProcessById(processID);
    const variableListAfterDelete = deleteVariableById(processID);
    setLocalStorageObject(LocalStorage.PROCESS_LIST, processListAfterDelete);
    setLocalStorageObject(LocalStorage.VARIABLE_LIST, variableListAfterDelete);
    router.reload();
  };

  const handleEditProcessByID = (processID: string) => {
    router.push(`/studio/modeler/${processID}`);
  };

  const handleDownloadProcessByID = (processID: string) => {
    const processXML = getProcessFromLocalStorage(processID).xml;
    exportFile(processXML, `${processID}.xml`);
  };

  const tableProps = {
    header: ['Process ID', 'Process Name', 'Owner', 'Last Modified', 'Actions'],
    data: formatData ?? [],
  };

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Process List
        </h1>
        <div className="flex justify-between w-90 mx-auto my-[30px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              width="45vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
          </InputGroup>
          <div className="flex justify-between gap-[10px]">
            <Button colorScheme="teal" onClick={onOpen}>
              New Process
            </Button>
            <Button variant="outline" colorScheme="teal">
              Import Process
            </Button>
          </div>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new process</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Process name</FormLabel>
                  <Input ref={initialRef} placeholder="Process name" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleCreateNewProcess}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div className="w-90 m-auto">
          <CustomTable
            header={tableProps.header}
            data={tableProps.data}
            onDownload={handleDownloadProcessByID}
            onDelete={handleDeleteProcessByID}
            onEdit={handleEditProcessByID}
          />
        </div>
      </SidebarContent>
      <SidebarContent>
        <h1 className="px-[20px] ml-[30px] font-bold text-2xl text-[#319795]">
          Select from our templates
        </h1>
        <div className="grid grid-cols-3 gap-[15px] w-90 m-auto">
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
        </div>
      </SidebarContent>
    </div>
  );
}
