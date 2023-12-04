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
import { useParams } from 'next/navigation';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import CustomTable from '@/components/CustomTable/CustomTable';
import TemplateCard from '@/components/TemplateCard/TemplateCard';
import { getLocalStorageObject } from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';
import { Process } from '@/types/process';
import { formatDate } from '@/utils/common';

const ServiceDetail = () => {
  const router = useRouter();
  const params = useParams();

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
          Process List By Service
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
        <Text fontSize="lg" fontWeight="bold">
          Service Information:
        </Text>
        <Text>ID: {params.id} </Text>
      </Box>
      <Box>
        <SidebarContent className="w-[80vw]">
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
            <CustomTable header={tableProps.header} data={tableProps.data} />
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
      </Box>
    </Container>
  );
};
export default ServiceDetail;
