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
import { Connection } from '@/interfaces/connection';
import connectionApi from '@/apis/connectionApi';
import { useRouter } from 'next/router';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ConnectionRow from './ConnectionRow';

interface ConnectionTableProps {
  header: string[];
  data: any;
  robotKey?: string;
  maxRows?: number;
  isLoading?: boolean;
}

const ConnectionTable = (props: ConnectionTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedForRemove, setSelectedForRemove] = useState({
    provider: '',
    name: '',
  });
  const [connectionData, setConnectionData] = useState<Connection[]>(
    props.data
  );
  const itemsPerPage = props.maxRows || 5;
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
      `/integration-service/detail/${connectionKey}?provider=${provider}&user=${name}`
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
                robotKey={props.robotKey}
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
