import { formatDate } from '@/utils/common';
import React, { useEffect, useState } from 'react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CustomTable from '@/components/CustomTable/CustomTable';
import documentData from '@/constants/documentData';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';

export default function Storage() {
  const tableProps = {
    header: ['Document ID', 'Owner', 'Type', 'Last Modified', 'Actions'],
    data: documentData ?? [],
  };
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Document List
        </h1>
        <div className="flex justify-between w-90 mx-auto my-[30px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              width="30vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
          </InputGroup>

          <div className="flex justify-between gap-[5px]">
            <Box className="w-[21vw]">
              <RangeDatepicker
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
              />
            </Box>
            <Box className="w-[10vw]">
              <Select defaultValue="all">
                <option value="google-sheet">Google Sheet</option>
                <option value="pdf">PDF</option>
                <option value="google-docs">Google Docs</option>
                <option value="image">Image</option>
                <option value="all">All</option>
              </Select>
            </Box>

            <Button colorScheme="teal">Import</Button>
          </div>
        </div>

        <div className="w-90 m-auto">
          <CustomTable
            header={tableProps.header}
            data={tableProps.data}
            onView={() => {}}
            onDownload={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      </SidebarContent>
    </div>
  );
}
