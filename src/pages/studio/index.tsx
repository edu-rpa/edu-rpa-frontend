import SidebarLayout from '@/components/Layouts/SidebarLayout';
import Sidebar from '@/components/Sidebar/Sidebar';
import CustomTable from '@/components/CustomTable/CustomTable';
import React from 'react';

export default function Studio() {
  return (
    <div className="bg-white w-[75vw] rounded-[15px] py-[30px]">
      <h1 className="px-[20px] ml-[25px] mb-[20px] font-bold text-2xl text-[#4FD1C5]">
        Process List
      </h1>
      <div className="w-90 m-auto">
        <CustomTable />
      </div>
    </div>
  );
}
