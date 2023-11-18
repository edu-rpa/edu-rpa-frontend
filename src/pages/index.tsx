import { Process } from '@/types/process';
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
import React from 'react';

export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef<HTMLInputElement>(null);
  const [currStorage, setCurrStorage] = React.useState<any>([]);
  // useEffect(() => {
  //   const profile = localStorageService.getProfile();
  //   profile ?? router.push('/auth/login');
  // }, []);
  React.useEffect(() => {
    const processLocalStorage = localStorage.getItem('processList');
    if (!processLocalStorage) {
      localStorage.setItem('processList', JSON.stringify([]));
    } else {
      setCurrStorage(JSON.parse(localStorage.getItem('processList') as string));
    }
  }, []);

  const handleCreateNewProcess = () => {
    const processID = generateProcessID();
    const xml = defaultXML(processID);
    const initalProcess = initProcess(
      processID,
      xml,
      initialRef.current?.value as string
    );
    currStorage.push(initalProcess);
    localStorage.setItem('processList', JSON.stringify(currStorage));
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
              localStorage.removeItem('processList');
              router.reload();
            }}>
            Clear All
          </Button>
          <div>
            {currStorage.map((process: Process, index: number) => {
              return (
                <div
                  key={index}
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
