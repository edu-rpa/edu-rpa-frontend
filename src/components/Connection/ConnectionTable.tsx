import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  HStack,
  Tag,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import { IoDocumentText } from 'react-icons/io5';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import { Connection } from '@/interfaces/connection';
import IconImage from '@/components/IconImage/IconImage';
import { providerData } from '@/constants/providerData';
import connectionApi from '@/apis/connectionApi';
import { useSelector } from 'react-redux';
import { userSelector } from '@/redux/selector';
import { useRouter } from 'next/router';

interface ConnectionTableProps {
  header: string[];
  data: any;
  maxRows?: number;
  isLoading?: boolean;
}

interface ConnectionRowProps {
  data: Connection;
  onView?: (connectionKey: string, provider: string, name: string) => void;
  onSelectedForRemove: (provider: string, name: string) => void;
}

const ConnectionRow = (props: ConnectionRowProps) => {
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [status, setStatus] = useState('Connected');
  const user = useSelector(userSelector);
  const { connectionKey, ...data } = props.data;

  const handleRefreshConnection = async () => {
    setIsLoadingRefresh(true);
    try {
      await connectionApi.refreshConnection(data.provider, data.name);
      setStatus('Connected');
    } catch (error) {
      setStatus('Disconnected');
    }
    setIsLoadingRefresh(false);
  };

  const handleReconnect = async () => {
    const provider = providerData.find(
      (provider) => provider.name === data.provider
    );
    if (provider) {
      window.open(
        `${process.env.NEXT_PUBLIC_DEV_API}/auth/${provider.slug}?fromUser=${user.id}&reconnect=true`,
        '_self'
      );
    }
  };

  useEffect(() => {
    handleRefreshConnection();
  }, []);

  const renderTableCell = (type: string, value: string) => {
    switch (type) {
      case 'status':
        return (
          <Tag
            colorScheme={value === 'Connected' ? 'green' : 'red'}
            size="md"
            p={3}
            rounded={10}>
            {value}
          </Tag>
        );
      case 'type':
        return (
          <Box className="flex justify-between">
            <Box className="flex justify-between">
              <IoDocumentText
                size="20px"
                className="hover:opacity-80 hover:cursor-pointer"
              />
              <Text className="text-[16px] ml-[10px]">{value}</Text>
            </Box>
            <Box></Box>
          </Box>
        );
      case 'provider':
        const provider = providerData.find(
          (provider) => provider.name === value
        );
        return (
          <Box className="flex justify-between items-center">
            <IconImage icon={provider!.icon} label={provider!.name} />
          </Box>
        );
      default:
        return <Text>{value}</Text>;
    }
  };

  return (
    <Tr
      _hover={{
        bg: '#4FD1C5',
        cursor: 'pointer',
        color: 'white',
        borderRadius: '15px',
      }}
      onClick={() =>
        props.onView && props.onView(connectionKey, data.provider, data.name)
      }>
      {Object.keys(data).map((key, columnIndex) => (
        <Td key={key}>{renderTableCell(key, data[key])}</Td>
      ))}
      <Td>
        {isLoadingRefresh ? (
          <Button
            isLoading
            loadingText="Refreshing"
            colorScheme="teal"
            variant="outline"
            size="sm"
            onClick={handleRefreshConnection}>
            Refresh
          </Button>
        ) : (
          <Tag
            colorScheme={status === 'Connected' ? 'green' : 'red'}
            size="md"
            p={3}
            rounded={10}>
            {status}
          </Tag>
        )}
      </Td>
      <Td>
        <HStack spacing={2}>
          <Box>
            <IconButton
              bg="white"
              aria-label="Delete item"
              onClick={(e) => {
                e.stopPropagation();
                props.onSelectedForRemove(data.provider, data.name);
              }}
              icon={<DeleteIcon color="#319795" />}
            />
          </Box>
          <Box>
            <IconButton
              bg="white"
              aria-label="View code"
              icon={<RepeatIcon color="#319795" />}
              onClick={(e) => {
                e.stopPropagation();
                handleReconnect();
              }}
            />
          </Box>
        </HStack>
      </Td>
    </Tr>
  );
};

const ConnectionTable = (props: ConnectionTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedForRemove, setSelectedForRemove] = useState({
    provider: '',
    name: '',
  });
  const [connectionData, setConnectionData] = useState<Connection[]>(
    props.data
  );
  const itemsPerPage = 5;
  const pageCount = Math.ceil(connectionData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = connectionData.slice(startIndex, endIndex);
  const toast = useToast();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (currentData.length == 0) return <Box></Box>;

  if (props.isLoading) {
    return <LoadingIndicator />;
  }

  const handlePageChange = (selected: any) => {
    setCurrentPage(selected.selected);
  };

  const handleNavigateServiceDetail = (
    connectionKey: string,
    provider: string,
    name: string
  ) => {
    router.push(
      `/integration-service/detail/${connectionKey}?provider=${provider}&service=${name}`
    );
  };

  const handleRemoveConnection = async (provider: string, name: string) => {
    try {
      await connectionApi.removeConnection(provider, name);
      toast({
        title: 'Connection removed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setConnectionData(
        connectionData.filter(
          (item) => item.provider !== provider || item.name !== name
        )
      );
    } catch (error) {
      toast({
        title: 'Failed to remove connection',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSelectForRemove = (provider: string, name: string) => {
    setSelectedForRemove({ provider, name });
    onOpen();
  };

  return (
    <Box
      border="1px solid"
      borderColor="#319795"
      borderRadius="15px"
      overflow="hidden">
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              {props.header.map((item: string) => (
                <Th key={item}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((item, index) => (
              <ConnectionRow
                key={index}
                data={item}
                onView={handleNavigateServiceDetail}
                onSelectedForRemove={handleSelectForRemove}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation to remove connection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure to remove this connection ?</Text>
            <Text fontWeight={'bold'}>
              Provider: {selectedForRemove.provider}, Name:{' '}
              {selectedForRemove.name}
            </Text>
            <Text>
              Robot using this connection will not be able to run if this
              connection is removed.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleRemoveConnection(
                  selectedForRemove.provider,
                  selectedForRemove.name
                );
                onClose();
              }}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ReactPaginate
        previousLabel={
          <IconButton aria-label="Previous">
            <ChevronLeftIcon />
          </IconButton>
        }
        nextLabel={
          <IconButton aria-label="Next">
            <ChevronRightIcon />
          </IconButton>
        }
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'flex justify-end items-center m-4 gap-[5px]'}
        previousLinkClassName={'font-bold'}
        nextLinkClassName={'font-bold'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
        activeClassName={'bg-primary rounded-[5px] text-white py-[8px]'}
        pageLinkClassName={
          'border rounded-[5px] px-[15px] py-[10px] hover:bg-primary hover:text-white'
        }
      />
    </Box>
  );
};

export default ConnectionTable;
