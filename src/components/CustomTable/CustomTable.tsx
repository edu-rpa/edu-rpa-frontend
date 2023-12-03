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
  HStack, // Import HStack for margin between cells
} from '@chakra-ui/react';
import {
  DownloadIcon,
  EditIcon,
  DeleteIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';

interface TableProps {
  header: string[];
  data: any[];
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CustomTable = (props: TableProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(props.data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = props.data.slice(startIndex, endIndex);
  if (currentData.length == 0) return <Box></Box>;
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
          {currentData.map((item) => (
            <Tr
              key={item.id}
              _hover={{
                bg: '#4FD1C5',
                cursor: 'pointer',
                color: 'white',
                borderRadius: '15px',
              }}
              onClick={() => props.onEdit(item.id)}>
              {Object.keys(item).map((key) => (
                <Td key={key}>{item[key]}</Td>
              ))}
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    bg="white"
                    aria-label="Download"
                    icon={
                      <DownloadIcon
                        color="#319795"
                        onClick={(e) => {
                          e.stopPropagation();
                          props.onDownload(item.id);
                        }}
                      />
                    }
                  />
                  <IconButton
                    bg="white"
                    aria-label="Edit item"
                    icon={
                      <EditIcon
                        color="#319795"
                        onClick={(e) => {
                          e.stopPropagation();
                          props.onEdit(item.id);
                        }}
                      />
                    }
                  />
                  <IconButton
                    bg="white"
                    aria-label="Delete item"
                    icon={
                      <DeleteIcon
                        color="#319795"
                        onClick={(e) => {
                          e.stopPropagation();
                          props.onDelete(item.id);
                        }}
                      />
                    }
                  />
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
        nextLabel={<IconButton aria-label="Next" icon={<ChevronRightIcon />} />} //
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
