import CustomTable from '@/components/CustomTable/CustomTable';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import { LocalStorage } from '@/constants/localStorage';
import { Process } from '@/types/process';
import { formatDate } from '@/utils/common';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import { deleteProcessById } from '@/utils/processService';
import { deleteVariableById } from '@/utils/variableService';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Robot() {
  const router = useRouter();
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
        id: item.processID.replace('Process', 'Robot'),
        name: item.processName?.replace('Process', 'Robot'),
        owner: 'You',
        last_modified: formatDate(new Date()),
      };
    });

  const tableProps = {
    header: ['Robot ID', 'Robot Name', 'Owner', 'Last Modified', 'Actions'],
    data: formatData ?? [],
  };

  const handleDeleteRobot = (robotID: string) => {
    const processID = robotID.replace('Robot', 'Process');
    const processListAfterDelete = deleteProcessById(processID);
    const variableListAfterDelete = deleteVariableById(processID);
    setLocalStorageObject(LocalStorage.PROCESS_LIST, processListAfterDelete);
    setLocalStorageObject(LocalStorage.VARIABLE_LIST, variableListAfterDelete);
    router.reload();
  };

  const handleMonitorRobot = (robotID: string) => {
    router.push(`/robot/monitor/${robotID}`);
  };

  const handleEditProcess = (robotID: string) => {
    router.push(`/studio/modeler/${robotID.replace('Robot', 'Process')}`);
  };

  const handleViewRobotCode = (robotID: string) => {
    router.push(`/robot/code/${robotID}`);
  };

  const handleExecuteRobot = (robotID: string) => {
    router.push(`/robot/execution/${robotID}`);
  };
  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Robot List
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
            onView={handleMonitorRobot}
            onDelete={handleDeleteRobot}
            onEdit={handleEditProcess}
            onRun={handleExecuteRobot}
            onViewFile={handleViewRobotCode}
          />
        </div>
      </SidebarContent>
    </div>
  );
}
