import { useBpmn } from '@/hooks/useBpmn';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useEffect, useRef, useState } from 'react';
import BpmnJsReact from './BpmnJsReact';
import {
  Box,
  Button,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import ModelerSideBar from './ModelerSidebar';
import { BpmnParser } from '@/utils/bpmn-parser/bpmn-parser.util';
import { setLocalStorageObject } from '@/utils/localStorageService';
import {
  getProcessFromLocalStorage,
  updateProcessInProcessList,
} from '@/utils/processService';
import { useRouter } from 'next/router';
import VariablesSideBar from './VariablesSideBar/VariablesSideBar';
import { LocalStorage } from '@/constants/localStorage';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { exportFile, stringifyCyclicObject } from '@/utils/common';
import { FaPlay } from 'react-icons/fa';
import { MdPublish } from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';

import { useParams } from 'next/navigation';
import { QUERY_KEY } from '@/constants/queryKey';
import processApi from '@/apis/processApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { CreateProcessDto } from '@/dtos/processDto';

function CustomModeler() {
  const router = useRouter();
  const ref = useRef<BpmnJsReactHandle>(null);
  const params = useParams();
  const bpmnReactJs = useBpmn();
  const processID = params.id;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateProcessWithApi = useMutation({
    mutationFn: async (payload: CreateProcessDto) => {
      return await processApi.createProcess(payload);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const handleInsertToBackend = (initialProcess: any) => {
    const createProcessPayloadAPI = {
      id: initialProcess.processID,
      name: initialProcess.processName,
      description: initialProcess.processDesc,
      xml: initialProcess.xml,
    };
    handleCreateProcessWithApi.mutate(createProcessPayloadAPI as any);
  };

  const { data: processDetailByID, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PROCESS_DETAIL],
    queryFn: () => processApi.getProcessByID(processID as string),
  });

  // sync data from api to localStorage
  useEffect(() => {
    if (!processDetailByID) return;
    const currentprocessID = getProcessFromLocalStorage(processID as string);
    if (currentprocessID.xml != '') return;
    const updateStorageByID = {
      ...currentprocessID,
      xml: processDetailByID.xml,
      variables: processDetailByID.variables,
      activities: processDetailByID.activities,
    };
    const replaceStorageSnapshot = updateProcessInProcessList(
      processID as string,
      updateStorageByID
    );
    setLocalStorageObject(LocalStorage.PROCESS_LIST, replaceStorageSnapshot);
  }, [processDetailByID]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="mt-[20px]">
      <Box className="flex justify-between items-center mx-[25px]">
        <Box className="flex justify-between items-center">
          <IconButton
            colorScheme="teal"
            aria-label="Prev to home"
            variant="outline"
            isRound={true}
            size="lg"
            onClick={() => router.push('/studio')}
            icon={<ChevronLeftIcon />}
          />
          <h1 className="text-primary font-bold text-2xl mx-[20px]">
            {processID}
          </h1>
        </Box>
        <Stack direction="row" spacing={4}>
          <Button leftIcon={<FaPlay />} colorScheme="teal" variant="solid">
            Run
          </Button>
          <Button leftIcon={<MdPublish />} colorScheme="orange" variant="solid">
            Publish
          </Button>
          <Button leftIcon={<IoMdShare />} colorScheme="blue" variant="solid">
            Share
          </Button>
        </Stack>
      </Box>

      <BpmnJsReact mode="edit" useBpmnJsReact={bpmnReactJs} ref={ref} />
      {bpmnReactJs.bpmnModeler && (
        <ModelerSideBar
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          modeler={bpmnReactJs}
        />
      )}

      <Button
        colorScheme="teal"
        size="md"
        className="mx-[5px]"
        onClick={async () => {
          const res = await bpmnReactJs.saveXML();
          exportFile(res.xml as string, `${processID}.xml`);
          console.log(res.xml);
        }}>
        Save XML
      </Button>
      <Button
        colorScheme="blue"
        size="md"
        className="mx-[5px]"
        onClick={async () => {
          const res = await bpmnReactJs.saveXML();
          const bpmnParser = new BpmnParser();
          const jsonProcess = stringifyCyclicObject(
            bpmnParser.parseXML(res.xml as string)
          );
          exportFile(jsonProcess, `${processID}.json`);
          console.log(bpmnParser.parseXML(res.xml as string));
        }}>
        Save JSON
      </Button>

      <Button
        colorScheme="orange"
        size="md"
        className="mx-[5px]"
        onClick={() => {
          const processProperties = getProcessFromLocalStorage(
            processID as string
          );
          console.log(processProperties);
          delete processProperties['xml'];
          exportFile(
            JSON.stringify(processProperties),
            `${processID}_properties.json`
          );
        }}>
        Save Properties
      </Button>
      <VariablesSideBar processID={processID as string} />
      <br />
    </div>
  );
}

export default CustomModeler;
