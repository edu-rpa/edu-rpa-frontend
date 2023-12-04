import { formatDate } from '@/utils/common';
import React, { useEffect, useState } from 'react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CustomTable from '@/components/CustomTable/CustomTable';
import { getLocalStorageObject } from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';
import { Process } from '@/types/process';

export default function Storage() {
  const [processList, setProcessList] = useState([]);

  useEffect(() => {
    const getProcessStorage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
    if (getProcessStorage) {
      setProcessList(getProcessStorage);
    }
  }, []);

  const formatData =
    processList &&
    processList.map((item: Process) => {
      return {
        id: item.processID.replace('Process', 'Document'),
        name: item.processName?.replace('Process', 'Document'),
        owner: 'You',
        last_modified: formatDate(new Date()),
        file: 'Google Sheet',
      };
    });

  const tableProps = {
    header: ['Document ID', 'Process ID', 'Owner', 'Last Modified', 'Download'],
    data: formatData ?? [],
  };

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Document List
        </h1>
        <div className="w-90 mx-auto my-[30px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input bg="white.300" type="text" placeholder="Search..." />
          </InputGroup>
        </div>

        <div className="w-90 m-auto">
          <CustomTable header={tableProps.header} data={tableProps.data} />
        </div>
      </SidebarContent>
    </div>
  );
}
