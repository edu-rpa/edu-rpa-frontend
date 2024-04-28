import connectionApi from '@/apis/connectionApi';
import ConnectionTable from '@/components/Connection/ConnectionTable';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import CreateNewConnectionModal from '@/components/Connection/CreateNewConnectionModal';
import { SearchIcon } from '@chakra-ui/icons';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import { Connection } from '@/interfaces/connection';
interface ConnectionProps {
  robotID: string;
}

export default function ConnectionDetail(props: ConnectionProps) {
  const router = useRouter();
  const toast = useToast();
  const [connectionData, setConnectionData] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = router.query.error;
  const successMessage = router.query.message;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await connectionApi.getAllConnectionsByRobotKey(
          props.robotID
        );
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

  const tableProps = {
    header: ['Service', 'Connection name', 'Created at', 'Status', 'Action'],
    data: connectionData,
  };

  const [providerFilter, setProviderFilter] = useState(
    router.query.provider
      ? (router.query.provider as AuthorizationProvider)
      : ''
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="flex justify-between w-full mx-auto my-[30px]">
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

        <CreateNewConnectionModal isOpen={isOpen} onClose={onClose} />
      </div>
      {tableProps.data.length > 0 && (
        <div className="w-full m-auto">
          <ConnectionTable
            {...tableProps}
            isLoading={isLoading}
            robotKey={props.robotID}
          />
        </div>
      )}
    </div>
  );
}
