import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronLeftIcon, SearchIcon } from '@chakra-ui/icons';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import CustomTable from '@/components/CustomTable/CustomTable';
import TemplateCard from '@/components/TemplateCard/TemplateCard';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';
import { Process } from '@/types/process';
import { exportFile, formatDate } from '@/utils/common';
import {
  deleteProcessById,
  getProcessFromLocalStorage,
} from '@/utils/processService';
import { deleteVariableById } from '@/utils/variableService';
import SampleImage from '@/assets/images/AutomationTemplate.jpg';

const ServiceDetail = () => {
  const router = useRouter();

  const [processList, setProcessList] = useState([]);

  useEffect(() => {
    const getProcessStorage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
    if (getProcessStorage) {
      setProcessList(getProcessStorage);
    }
  }, []);

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

  const tableProps = {
    header: ['Process ID', 'Process Name', 'Owner', 'Last Modified', 'Actions'],
    data: formatData ?? [],
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
    <Container maxW="container.xl" className="bg-white h-[100vh]">
      <Box className="flex justify-between items-center w-90 m-auto">
        <IconButton
          colorScheme="teal"
          aria-label="Prev to home"
          variant="outline"
          isRound={true}
          size="lg"
          onClick={() => router.push('/service')}
          icon={<ChevronLeftIcon />}
        />
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          color="teal"
          my={5}
          py={8}>
          Process List By Connection
        </Heading>
        <Box></Box>
      </Box>
      <Box
        bg="gray.100"
        p={4}
        rounded="lg"
        shadow="md"
        mb={6}
        className="w-90 m-auto">
        <Text>
          <b>Service:</b> Google Drive
        </Text>
        <Text>
          <b>Connection ID:</b> 2023-09-17T06:55:54.536
        </Text>
        <Text>
          <b>Owner:</b> ducan1406@gmail.com
        </Text>
      </Box>
      <Box>
        <SidebarContent className="w-[70vw]">
          <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
            Process List
          </h1>
          <div className="flex justify-between w-90 mx-auto my-[30px]">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                width="80vw"
                bg="white.300"
                type="text"
                placeholder="Search..."
              />
            </InputGroup>
          </div>

          <div className="w-90 m-auto">
            <CustomTable
              header={tableProps.header}
              data={tableProps.data}
              onView={handleEditProcessByID}
              onEdit={handleEditProcessByID}
              onDownload={handleDownloadProcessByID}
              onDelete={handleDeleteProcessByID}
            />
          </div>
        </SidebarContent>
        <SidebarContent className="w-[70vw]">
          <h1 className="px-[20px] ml-[30px] font-bold text-2xl text-[#319795]">
            Google Drive Templates
          </h1>
          <div className="grid grid-cols-3 gap-[15px] w-90 m-auto">
            <TemplateCard
              image={SampleImage}
              title="Grading 100 English Exams from sample document"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et..."
            />
            <TemplateCard
              image={SampleImage}
              title="Get 100 emails from Inbox"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et..."
            />
            <TemplateCard
              image={SampleImage}
              title="Export Data To Google Sheet"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et..."
            />
            <TemplateCard
              image={SampleImage}
              title="Extract Text From An Image"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et..."
            />
          </div>
        </SidebarContent>
      </Box>
    </Container>
  );
};
export default ServiceDetail;
