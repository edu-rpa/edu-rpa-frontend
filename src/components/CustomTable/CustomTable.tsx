import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { DownloadIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const CustomTable = () => {
  const data = [
    { id: 1, name: 'Item 1', quantity: 3, description: 'Description 1' },
    { id: 2, name: 'Item 2', quantity: 5, description: 'Description 2' },
    { id: 3, name: 'Item 3', quantity: 9, description: 'Description 3' },
  ];

  return (
    <Box
      border="1px solid"
      borderColor="#4FD1C5"
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
          {data.map((item) => (
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
                <IconButton
                  bg="white"
                  aria-label="Download"
                  icon={<DownloadIcon color="#4FD1C5" />}
                  mr={2}
                />
                <IconButton
                  bg="white"
                  aria-label="Edit item"
                  icon={<EditIcon color="#4FD1C5" />}
                  mr={2}
                />
                <IconButton
                  bg="white"
                  aria-label="Delete item"
                  icon={<DeleteIcon color="#4FD1C5" />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CustomTable;
