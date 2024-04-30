import connectionApi from '@/apis/connectionApi';
import ConnectionTable from '@/components/Connection/ConnectionTable';
import {
  Box,
  Button,
  IconButton,
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
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import { Connection } from '@/interfaces/connection';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
interface ConnectionProps {
  robotID: string;
  tabIndex?: number;
}

export default function ConnectionDetail(props: ConnectionProps) {
  const router = useRouter();
  const toast = useToast();

  const errorMessage = router.query.error;
  const successMessage = router.query.message;

  const { data: connectionList, refetch: refetchConnctionList } = useQuery({
    queryKey: [QUERY_KEY.CONNECTION_LIST_BY_ROBOT_KEY],
    queryFn: () => connectionApi.getAllConnectionsByRobotKey(props.robotID),
  });

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
    data: connectionList ?? [],
  };

  const [providerFilter, setProviderFilter] = useState(
    router.query.provider
      ? (router.query.provider as AuthorizationProvider)
      : ''
  );

  useEffect(() => {
    handleRefetch();
  }, [props.tabIndex]);

  const handleRefetch = () => {
    refetchConnctionList();
  };

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
          <Box className="w-[15vw] ml-[20px] flex justify-between">
            <Select
              defaultValue=""
              onChange={(e) => {
                setProviderFilter(e.target.value);
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
          <IconButton
            aria-label="Refresh"
            icon={<RepeatIcon />}
            onClick={handleRefetch}
            className="ml-5"
          />
        </InputGroup>
      </div>
      {tableProps.data.length > 0 && (
        <div className="w-full m-auto">
          <ConnectionTable {...tableProps} robotKey={props.robotID} />
        </div>
      )}
    </div>
  );
}
