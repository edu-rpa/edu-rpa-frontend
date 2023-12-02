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

const CustomTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const data = [
    { id: 1, name: 'Item 1', quantity: 3, description: 'Description 1' },
    { id: 2, name: 'Item 2', quantity: 5, description: 'Description 2' },
    { id: 3, name: 'Item 3', quantity: 9, description: 'Description 3' },
    { id: 4, name: 'Item 4', quantity: 10, description: 'Description 4' },
    { id: 5, name: 'Item 5', quantity: 19, description: 'Description 5' },
    { id: 6, name: 'Item 6', quantity: 3, description: 'Description 6' },
    { id: 7, name: 'Item 7', quantity: 5, description: 'Description 7' },
    { id: 8, name: 'Item 8', quantity: 9, description: 'Description 8' },
    { id: 9, name: 'Item 9', quantity: 10, description: 'Description 9' },
    { id: 10, name: 'Item 10', quantity: 19, description: 'Description 10' },
  ];

  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Box
      border="1px solid"
      borderColor="#319795"
      borderRadius="15px"
      overflow="hidden">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Process ID</Th>
            <Th>Process Name</Th>
            <Th>Owner</Th>
            <Th>Last Modified</Th>
            <Th>Actions</Th>
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
              }}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td>{item.description}</Td>
              <Td>
                <HStack spacing={2}>
                  {' '}
                  {/* Add margin between cells */}
                  <IconButton
                    bg="white"
                    aria-label="Download"
                    icon={<DownloadIcon color="#319795" />}
                  />
                  <IconButton
                    bg="white"
                    aria-label="Edit item"
                    icon={<EditIcon color="#319795" />}
                  />
                  <IconButton
                    bg="white"
                    aria-label="Delete item"
                    icon={<DeleteIcon color="#319795" />}
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
