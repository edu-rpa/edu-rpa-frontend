import { formatDate } from '@/utils/common';
import React from 'react';
import { connectionData } from './detail/sampleData';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CustomTable from '@/components/CustomTable/CustomTable';
import { useRouter } from 'next/router';

export default function Service() {
  const router = useRouter();
  const tableProps = {
    header: ['Service', 'Connection ID', 'Owner', 'Last Modified', 'Status'],
    data: connectionData,
  };
  const handleViewService = (serviceID: string) => {
    router.push(`/service/detail/${serviceID}`);
  };

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Connection List
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
          <CustomTable
            header={tableProps.header}
            data={tableProps.data}
            onView={handleViewService}
          />
        </div>
      </SidebarContent>
    </div>
  );
}
