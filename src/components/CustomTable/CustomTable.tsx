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

interface TableProps {
  header: string[];
  data: any[];
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onRun?: (id: string) => void;
  onViewFile?: (id: string) => void;
}

const CustomTable = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(props.data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = props.data.slice(startIndex, endIndex);
  if (currentData.length == 0) return <Box></Box>;

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
      case 'file':
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
              <Th>{item}</Th>
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
                columnIndex < 5 ? (
                  <Td key={key}>{renderTableCell(key, item[key])}</Td>
                ) : null
              )}
              <Td>
                <HStack spacing={2}>
                  {props.onRun && (
                    <IconButton
                      bg="white"
                      aria-label="Run"
                      icon={
                        <FaPlay
                          color="#319795"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            props.onRun && props.onRun(item.id);
                          }}
                        />
                      }
                    />
                  )}
                  {props.onViewFile && (
                    <IconButton
                      bg="white"
                      aria-label="Delete item"
                      icon={
                        <ViewIcon
                          color="#319795"
                          onClick={(e) => {
                            e.stopPropagation();
                            props.onViewFile && props.onViewFile(item.id);
                          }}
                        />
                      }
                    />
                  )}
                  {props.onDownload && (
                    <IconButton
                      bg="white"
                      aria-label="Download"
                      icon={
                        <DownloadIcon
                          color="#319795"
                          onClick={(e) => {
                            e.stopPropagation();
                            props.onDownload && props.onDownload(item.id);
                          }}
                        />
                      }
                    />
                  )}
                  {props.onEdit && (
                    <IconButton
                      bg="white"
                      aria-label="Edit item"
                      icon={
                        <EditIcon
                          color="#319795"
                          onClick={(e) => {
                            e.stopPropagation();
                            props.onEdit && props.onEdit(item.id);
                          }}
                        />
                      }
                    />
                  )}
                  {props.onDelete && (
                    <IconButton
                      bg="white"
                      aria-label="Delete item"
                      icon={
                        <DeleteIcon
                          color="#319795"
                          onClick={(e) => {
                            e.stopPropagation();
                            props.onDelete && props.onDelete(item.id);
                          }}
                        />
                      }
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
          <IconButton aria-label="Previous" icon={<ChevronLeftIcon />} />
        }
        nextLabel={<IconButton aria-label="Next" icon={<ChevronRightIcon />} />}
        pageCount={pageCount}
        onPageChange={(selected) => setCurrentPage(selected.selected)}
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
