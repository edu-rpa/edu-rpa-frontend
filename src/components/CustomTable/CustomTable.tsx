import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import {
  DownloadIcon,
  EditIcon,
  DeleteIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import { IoDocumentText } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface TableProps {
  header: string[];
  data: any[];
  maxRows?: number;
  isLoading?: boolean;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onRun?: (id: string) => void;
  onViewFile?: (id: string) => void;
}
const DEFAULT_MAX_ROWS = 6;

const CustomTable = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(props.data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = props.data.slice(startIndex, endIndex);

  if (currentData.length == 0) return <Box></Box>;

  if (props.isLoading) {
    return <LoadingIndicator />;
  }

  const handlePageChange = (selected: any) => {
    setCurrentPage(selected.selected);
  };

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
              <IoDocumentText size="20px" className="hover:opacity-80" />
              <Text className="text-[16px] ml-[10px]">{value}</Text>
            </Box>
            <Box></Box>
          </Box>
        );
      default:
        return <Text>{value}</Text>;
    }
  };

  return (
    <Box
      border="1px solid"
      borderColor="#319795"
      borderRadius="15px"
      overflow="hidden">
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
            <Tr
              key={item.id}
              _hover={{
                bg: '#4FD1C5',
                cursor: 'pointer',
                color: 'white',
                borderRadius: '15px',
              }}
              onClick={() => props.onView && props.onView(item.id)}>
              {Object.keys(item).map((key, columnIndex) =>
                columnIndex < (props.maxRows ?? DEFAULT_MAX_ROWS) ? (
                  <Td key={key}>{renderTableCell(key, item[key])}</Td>
                ) : null
              )}
              <Td>
                <HStack spacing={2}>
                  {props.onRun && (
                    <IconButton
                      bg="white"
                      aria-label="Run"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        props.onRun && props.onRun(item.id);
                      }}
                      icon={<FaPlay color="#319795" />}
                    />
                  )}
                  {props.onViewFile && (
                    <IconButton
                      bg="white"
                      aria-label="View Item"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onViewFile && props.onViewFile(item.id);
                      }}
                      icon={<ViewIcon color="#319795" />}
                    />
                  )}
                  {props.onDownload && (
                    <IconButton
                      bg="white"
                      aria-label="Download"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onDownload && props.onDownload(item.id);
                      }}
                      icon={<DownloadIcon color="#319795" />}
                    />
                  )}
                  {props.onEdit && (
                    <IconButton
                      bg="white"
                      aria-label="Edit item"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onEdit && props.onEdit(item.id);
                      }}
                      icon={<EditIcon color="#319795" />}
                    />
                  )}
                  {props.onDelete && (
                    <IconButton
                      bg="white"
                      aria-label="Delete item"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onDelete && props.onDelete(item.id);
                      }}
                      icon={<DeleteIcon color="#319795" />}
                    />
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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

export default CustomTable;
