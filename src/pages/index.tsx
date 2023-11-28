import { LocalStorage } from '@/constants/localStorage';
import { Process } from '@/types/process';
import { VariableItem } from '@/types/variable';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import {
  defaultXML,
  generateProcessID,
  initProcess,
} from '@/utils/processService';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const [currentStorage, setCurrentStorage] = useState<Process[]>([]);
  // useEffect(() => {
  //   const profile = localStorageService.getProfile();
  //   profile ?? router.push('/auth/login');
  // }, []);
  useEffect(() => {
    const currentStorage = localStorage.getItem(LocalStorage.PROCESS_LIST);
    if (!currentStorage) {
      localStorage.setItem(LocalStorage.PROCESS_LIST, JSON.stringify([]));
    } else {
      const storage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
      console.log('Process Storage', storage);
      setCurrentStorage(storage);
    }
  }, []);

  useEffect(() => {
    const variableStorage = localStorage.getItem(LocalStorage.VARIABLE_LIST);
    if (!variableStorage) {
      localStorage.setItem(LocalStorage.VARIABLE_LIST, JSON.stringify([]));
    } else {
      const processStorage = getLocalStorageObject(LocalStorage.PROCESS_LIST);
      const variableStorage = getLocalStorageObject(LocalStorage.VARIABLE_LIST);
      const processList = processStorage.map((item: Process) => item.processID);
      const filteredVariableStorage = variableStorage.filter(
        (variable: VariableItem) => processList.includes(variable.processID)
      );
      setLocalStorageObject(
        LocalStorage.VARIABLE_LIST,
        filteredVariableStorage
      );
      console.log(
        'Variable storage',
        getLocalStorageObject(LocalStorage.VARIABLE_LIST)
      );
    }
  }, []);

  const handleCreateNewProcess = () => {
    const processID = generateProcessID();
    const xml = defaultXML(processID);
    const initialProcess = initProcess(
      processID,
      xml,
      initialRef.current?.value as string
    );
    setLocalStorageObject(LocalStorage.PROCESS_LIST, [
      ...currentStorage,
      initialProcess,
    ]);
    router.push(`/studio/modeler/${processID}`);
  };

  return (
    <div className="mt-[130px]">
      <div className="bg-white w-90 m-auto mt-[40px] p-[20px] rounded-xl">
        <h1 className="text-2xl font-bold text-primary">Current Project</h1>
        <div className="mt-[20px]">
          <Button colorScheme="teal" onClick={onOpen}>
            New Process
          </Button>
          <Button
            colorScheme="blue"
            className="ml-[10px]"
            onClick={() => {
              localStorage.removeItem(LocalStorage.PROCESS_LIST);
              localStorage.removeItem(LocalStorage.VARIABLE_LIST);
              router.reload();
            }}>
            Clear All
          </Button>
          <div>
            {currentStorage.map((process: Process, index: number) => {
              return (
                <div
                  key={process.processID}
                  className="p-[10px] shadow-custom-0 rounded-xl hover:cursor-pointer hover:opacity-80 hover:bg-blue-300 my-[15px]"
                  onClick={() => {
                    router.push(`/studio/modeler/${process.processID}`);
                  }}>
                  <h1>{process.processName}</h1>
                  <h1>{process.processID}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new process</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Process name</FormLabel>
              <Input ref={initialRef} placeholder="Process name" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateNewProcess}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
