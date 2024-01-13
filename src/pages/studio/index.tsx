import CustomTable from '@/components/CustomTable/CustomTable';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
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
  Select,
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
import AutomationTemplateImage from '@/assets/images/AutomationTemplate.jpg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateProcessDto } from '@/dtos/processDto';
import processApi from '@/apis/processApi';
import { QUERY_KEY } from '@/constants/queryKey';

export default function Studio() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const descRepf = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const [processType, setProcessType] = useState('free');
  const [selectFilter, setSelectFilter] = useState('all');

  const { data: countProcess, isLoading: countProcessLoading } = useQuery({
    queryKey: [QUERY_KEY.PROCESS_COUNT],
    queryFn: () => processApi.getNumberOfProcess(),
  });

  // TODO: update pagination
  const limit = countProcess ?? 0;
  const page = 1;

  const { data: allProcess } = useQuery({
    queryKey: [QUERY_KEY.PROCESS_LIST],
    queryFn: () => processApi.getAllProcess(limit, page),
  });

  const syncBackendToLocalStorage = () => {
    return allProcess
      ? allProcess.map((item: any) => {
          return {
            processID: item.id,
            processName: item.name,
            processDesc: item.description,
            processType: 'free',
            xml: '',
            activities: [],
            variables: [],
          };
        })
      : [];
  };

  useEffect(() => {
    const getProcessStorage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
    if (getProcessStorage.length == 0) {
      localStorage.setItem(
        LocalStorage.PROCESS_LIST,
        JSON.stringify(syncBackendToLocalStorage())
      );
    } else {
      console.log('Process Storage', getProcessStorage);
    }
  }, [allProcess]);

  useEffect(() => {
    const variableStorage = localStorage.getItem(LocalStorage.VARIABLE_LIST);
    if (!variableStorage) {
      localStorage.setItem(LocalStorage.VARIABLE_LIST, JSON.stringify([]));
    } else {
      preProcessingVariableList();
      console.log(
        'Variable Storage',
        getLocalStorageObject(LocalStorage.VARIABLE_LIST)
      );
    }
  }, []);

  const preProcessingVariableList = () => {
    const processStorage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
    const variableStorage = getLocalStorageObject(LocalStorage.VARIABLE_LIST);
    const processList = processStorage.map((item: Process) => item.processID);
    const filteredVariableStorage = variableStorage.filter(
      (variable: VariableItem) => processList.includes(variable.processID)
    );
    setLocalStorageObject(LocalStorage.VARIABLE_LIST, filteredVariableStorage);
  };

  const formatData =
    allProcess &&
    allProcess?.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        ptype: item.description,
        owner: 'You',
        last_modified: item.updatedAt,
      };
    });

  const tableProps = {
    header: [
      'Process ID',
      'Process Name',
      'Process Description',
      'Owner',
      'Last Modified',
      'Actions',
    ],
    data: formatData ?? [],
  };

  const handleCreateProcessWithApi = useMutation({
    mutationFn: async (payload: CreateProcessDto) => {
      return await processApi.createProcess(payload);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const handleCreateNewProcess = () => {
    const processID = generateProcessID();
    const xml = defaultXML(processID);
    const initialProcess = initProcess(
      processID,
      xml,
      initialRef.current?.value as string,
      descRepf.current?.value as string,
      processType
    );
    setLocalStorageObject(LocalStorage.PROCESS_LIST, [
      ...getLocalStorageObject(LocalStorage.PROCESS_LIST),
      initialProcess,
    ]);

    // add to backend
    const createProcessPayloadAPI = {
      id: initialProcess.processID,
      name: initialProcess.processName,
      description: initialProcess.processDesc,
      xml: initialProcess.xml,
    };
    handleCreateProcessWithApi.mutate(createProcessPayloadAPI as any);

    router.push(`/studio/modeler/${processID}`);
  };

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
              width="30vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
            <Box className="w-[15vw] ml-[20px]">
              <Select
                defaultValue="all"
                onChange={(e) => setSelectFilter(e.target.value)}>
                <option value="ocr">OCR</option>
                <option value="email-processing">Email Processing</option>
                <option value="google-workspace">Google Workpace</option>
                <option value="free">Free</option>
                <option value="all">All</option>
              </Select>
            </Box>
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
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input ref={descRepf} placeholder="Your description" />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    defaultValue="free"
                    onChange={(e) => setProcessType(e.target.value)}>
                    <option value="ocr">OCR</option>
                    <option value="email-processing">Email Processing</option>
                    <option value="google-workspace">Google Workpace</option>
                    <option value="free">Free</option>
                  </Select>
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
            onView={handleEditProcessByID}
            onDownload={handleDownloadProcessByID}
            onDelete={handleDeleteProcessByID}
            onEdit={handleEditProcessByID}
            isLoading={countProcessLoading}
          />
        </div>
      </SidebarContent>
      <SidebarContent>
        <h1 className="px-[20px] ml-[30px] font-bold text-2xl text-[#319795]">
          Select from our templates
        </h1>
        <div className="grid grid-cols-3 gap-[15px] w-90 m-auto">
          <TemplateCard
            image={AutomationTemplateImage}
            title="Grading 100 English Exams from sample document"
            description="Evaluating 100 English Exam Papers from the provided sample document, ensuring accuracy and fairness throughout the grading process..."
          />
          <TemplateCard
            image={AutomationTemplateImage}
            title="Get 100 emails from Inbox"
            description="Retrieve 100 emails from your Inbox, managing and organizing your electronic correspondence efficiently and effectively..."
          />
          <TemplateCard
            image={AutomationTemplateImage}
            title="Export Data To Google Sheet"
            description="Seamlessly transfer your data directly to Google Sheets with our intuitive export feature. Whether you're managing extensive datasets, tracking project progress, or analyzing financial records, our tool ensures your information is synchronized in real-time."
          />
          <TemplateCard
            image={AutomationTemplateImage}
            title="Extract Text From An Image"
            description="Unlock the hidden potential of your images with our cutting-edge templates. It's your gateway to converting visual content into actionable text, making information more accessible and versatile than ever before."
          />
        </div>
      </SidebarContent>
    </div>
  );
}
