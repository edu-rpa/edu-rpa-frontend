import { formatDate } from '@/utils/common';
import React, { useRef, useState, useEffect } from 'react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { QuestionIcon, SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import connectionApi from '@/apis/connectionApi';
import { Connection } from '@/interfaces/connection';

import ConnectionTable from '@/components/Connection/ConnectionTable';
import CreateNewConnectionModal from '@/components/Connection/CreateNewConnectionModal';
import _ from 'lodash';
import { ToolTipExplain } from '@/constants/description';

export default function Service() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [providerFilter, setProviderFilter] = useState(
    router.query.provider
      ? (router.query.provider as AuthorizationProvider)
      : ''
  );
  const [connectionData, setConnectionData] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tableProps = {
    header: ['Service', 'Connection name', 'Created at', 'Status', 'Action'],
    data: connectionData,
  };
  const errorMessage = router.query.error;
  const successMessage = router.query.message;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data = await connectionApi.queryConnections();
        setConnectionData(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: `Error: ${errorMessage}`,
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      toast({
        title: `Success: ${successMessage}`,
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [successMessage]);

  if (providerFilter) {
    tableProps.data = tableProps.data.filter(
      (connection) => connection.provider === providerFilter
    );
  }

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <div className="flex flex-start">
          <h1 className="pl-[20px] pr-[10px] ml-[35px] font-bold text-2xl text-[#319795]">
            Connection List
          </h1>
          <Tooltip
            hasArrow
            label={ToolTipExplain.INTERGRATION_SERVICE}
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
              width="40vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
            <Box className="w-[15vw] ml-[20px]">
              <Select
                defaultValue=""
                onChange={(e) => {
                  setProviderFilter(e.target.value);
                  router.push({
                    pathname: router.pathname,
                    query: { provider: e.target.value },
                  });
                }}>
                <option value="">All services</option>
                {Object.values(AuthorizationProvider).map((provider) => {
                  return (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  );
                })}
              </Select>
            </Box>
          </InputGroup>
          <div className="flex justify-between gap-[10px]">
            <Button colorScheme="teal" onClick={onOpen}>
              New Connection
            </Button>
          </div>

          <CreateNewConnectionModal isOpen={isOpen} onClose={onClose} />
        </div>

        {tableProps.data.length > 0 ? (
          <div className="w-90 m-auto">
            <ConnectionTable {...tableProps} isLoading={isLoading} />
          </div>
        ) : (
          <div className="w-90 m-auto flex justify-center items-center">
            <div className="text-center">
              <div className="text-2xl font-bold">No connections</div>
              <div className="text-gray-500">
                Create a new connection to help you integrate with other
                services
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </div>
  );
}
