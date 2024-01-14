import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import DynamicVariableTable from '@/components/Bpmn/DynamicVariableTable/DynamicVariableTable';
import { Variable } from '@/types/variable';
import {
  convertToRefactoredObject,
  getVariableItemFromLocalStorage,
  replaceVariableStorage,
} from '@/utils/variableService';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';
import {
  getProcessFromLocalStorage,
  updateProcessInProcessList,
} from '@/utils/processService';

interface VariablesSideBarProps {
  processID: string;
}

export default function VariablesSideBar(props: VariablesSideBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialStorage = getVariableItemFromLocalStorage(props.processID);
  const [variableList, setVariableList] = useState<Variable[]>(
    initialStorage ? initialStorage.variables : []
  );

  useEffect(() => {
    if (variableList.length > 0) {
      setVariableList((prevVariableList) => {
        if (prevVariableList !== variableList) {
          return variableList;
        }
        return prevVariableList;
      });
    }
  }, [variableList]);

  const handleBlur = () => {
    const currentVariable = {
      processID: props.processID,
      variables: variableList,
    };
    if (!initialStorage) {
      setLocalStorageObject(LocalStorage.VARIABLE_LIST, [
        ...getLocalStorageObject(LocalStorage.VARIABLE_LIST),
        currentVariable,
      ]);
    } else {
      const newStorage = replaceVariableStorage(
        props.processID,
        currentVariable
      );
      setLocalStorageObject(LocalStorage.VARIABLE_LIST, newStorage);
      const variableListByID = getVariableItemFromLocalStorage(props.processID);

      setVariableList(variableListByID.variables);
      const processProperties = getProcessFromLocalStorage(
        props.processID as string
      );

      const refactoredVariables = convertToRefactoredObject(variableListByID);

      const updateStorageByID = {
        ...processProperties,
        variables: refactoredVariables,
      };
      const replaceStorageSnapshot = updateProcessInProcessList(
        props.processID as string,
        updateStorageByID
      );
      setLocalStorageObject(LocalStorage.PROCESS_LIST, replaceStorageSnapshot);
    }
  };

  return (
    <div className="inline-block">
      <Button colorScheme="red" size="md" className="mx-[5px]" onClick={onOpen}>
        Set Variable
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        onCloseComplete={handleBlur}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Variable List</DrawerHeader>

          <DrawerBody>
            <div className="w-full m-auto">
              <DynamicVariableTable
                variableList={variableList}
                setVariableList={setVariableList}
              />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
