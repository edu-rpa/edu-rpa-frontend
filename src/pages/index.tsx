import { BPMNState } from '@/types/activity';
import { generateProcessID } from '@/utils/processService';
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

  const defaultXML = (processID: string) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1htzell" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="14.0.0">
      <bpmn:process id="${processID}" isExecutable="false">
        <bpmn:startEvent id="StartEvent_0vr9as6" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${processID}">
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_0vr9as6">
            <dc:Bounds x="152" y="82" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`;
  };

  const handleCreateNewProcess = () => {
    const processID = generateProcessID();
    const xml = defaultXML(processID);
    const payload = {
      processID: processID,
      xml: xml,
      processName: initialRef.current?.value,
      activities: [
        {
          activityID: 'StartEvent_0vr9as6',
          activityType: 'bpmn:StartEvent',
        },
      ],
    };
    currStorage.push(payload);
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
          <div>
            {currStorage.map((process: BPMNState, index: number) => {
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
      {/* <div className="bg-white w-90 m-auto mt-[40px] p-[20px] rounded-xl">
        <h1>Templates</h1>
        <div>
          {Array(7)
            .fill(0)
            .map((value: number, index: number) => {
              return (
                <div
                  key={index}
                  className="p-[10px] bg-blue-200 my-[15px] rounded-xl hover:cursor-pointer hover:opacity-80">
                  Template {index + 1}
                </div>
              );
            })}
        </div>
      </div> */}
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
