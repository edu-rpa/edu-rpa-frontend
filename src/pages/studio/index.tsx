import Sidebar from '@/components/Sidebar/Sidebar';
import CustomTable from '@/components/Table/Table';
import { setLogin } from '@/redux/slice/homeSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Studio() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogin());
  }, []);
  return (
    <div>
      <Sidebar>
        <div className="bg-white w-[60vw] rounded-[15px] py-[30px]">
          <h1 className="px-[20px] ml-[25px] mb-[20px] font-bold text-2xl text-[#4FD1C5]">
            Process List
          </h1>
          <div className="w-90 m-auto">
            <CustomTable />
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
