import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
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
  getVariableItemFromLocalStorage,
  replaceVariableStorage,
} from '@/utils/variableService';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import { LocalStorage } from '@/constants/localStorage';

interface VariablesSideBarProps {
  processID: string;
}

export default function VariablesSideBar(props: VariablesSideBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialStorage = getVariableItemFromLocalStorage(props.processID);
  const [variableList, setVariableList] = useState<Variable[]>(
    initialStorage ? initialStorage.variables : []
  );
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
      setVariableList(
        getVariableItemFromLocalStorage(props.processID).variables
      );
    }
  };

  return (
    <div className="inline-block">
      <Button
        colorScheme="pink"
        size="md"
        className="mx-[5px]"
        onClick={onOpen}>
        Variable
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
