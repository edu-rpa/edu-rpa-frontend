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
  useToast,
} from '@chakra-ui/react';
import ModelerSideBar from './ModelerSidebar';
import { BpmnParser } from '@/utils/bpmn-parser/bpmn-parser.util';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
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
import { FaSave } from 'react-icons/fa';
import { MdPublish } from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';
import {
  convertToRefactoredObject,
  getIndexVariableStorage,
  getVariableItemFromLocalStorage,
} from '@/utils/variableService';

import { useParams } from 'next/navigation';
import { QUERY_KEY } from '@/constants/queryKey';
import processApi from '@/apis/processApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { SaveProcessDto } from '@/dtos/processDto';
import { useDispatch, useSelector } from 'react-redux';
import { bpmnSelector } from '@/redux/selector';
import { isSavedChange } from '@/redux/slice/bpmnSlice';

interface OriginalObject {
  [key: string]: {
    type: string;
    isArgument: boolean;
    defaultValue: string;
  };
}

function CustomModeler() {
  const router = useRouter();
  const ref = useRef<BpmnJsReactHandle>(null);
  const params = useParams();
  const bpmnReactJs = useBpmn();
  const toast = useToast();
  const dispatch = useDispatch();
  const processID = params.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSavedChanges = useSelector(bpmnSelector);

  const { data: processDetailByID, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PROCESS_DETAIL],
    queryFn: () => processApi.getProcessByID(processID as string),
  });

  const convertObjectToArray = (originalObject: OriginalObject) => {
    return Object.entries(originalObject).map(
      ([name, { type, isArgument, defaultValue }], index) => ({
        id: index + 1,
        name,
        value: defaultValue,
        isArgument,
        type,
      })
    );
  };

  // sync data from api to localStorage
  useEffect(() => {
    if (!processDetailByID) return;
    const currentprocessID = getProcessFromLocalStorage(processID as string);
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

  useEffect(() => {
    if (!processDetailByID) return;
    const indexLocalStorage = getIndexVariableStorage(processID as string);
    const payloadStorage = {
      processID: processID,
      variables: convertObjectToArray(processDetailByID.variables),
    };
    console.log('Payload Storage', payloadStorage);
    const currentLocalStorageList = getLocalStorageObject(
      LocalStorage.VARIABLE_LIST
    );

    if (indexLocalStorage === undefined) {
      setLocalStorageObject(LocalStorage.VARIABLE_LIST, [
        ...currentLocalStorageList,
        payloadStorage,
      ]);
    } else {
      currentLocalStorageList[indexLocalStorage] = payloadStorage;
      setLocalStorageObject(
        LocalStorage.VARIABLE_LIST,
        currentLocalStorageList
      );
    }
  }, [processDetailByID, processID]);

  const handleSaveAll = useMutation({
    mutationFn: async (payload: SaveProcessDto) => {
      return await processApi.saveProcessByID(processID as string, payload);
    },
    onSuccess: () => {
      toast({
        title: 'Save all changes sucessfully!',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      dispatch(isSavedChange(true));
    },
    onError: () => {
      toast({
        title: 'There are some errors, try again !',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    },
  });

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
            {processID}{' '}
            {!isSavedChanges.isSaved && (
              <span className="text-red-500">{'*'}</span>
            )}
          </h1>
        </Box>
        <Stack direction="row" spacing={4}>
          <Button
            leftIcon={<FaSave />}
            colorScheme="blue"
            variant="solid"
            onClick={() => {
              const processProperties = getProcessFromLocalStorage(
                processID as string
              );
              if (!processProperties) {
                toast({
                  title: 'There are some erros, please refresh the page!',
                  status: 'error',
                  position: 'top-right',
                  duration: 1000,
                  isClosable: true,
                });
              } else {
                const variableListByID = getVariableItemFromLocalStorage(
                  processID as string
                );
                const refactoredVariables =
                  convertToRefactoredObject(variableListByID);
                const payload = {
                  xml: processProperties.xml,
                  activities: processProperties.activities,
                  variables: refactoredVariables ?? {},
                };
                handleSaveAll.mutate(payload);
              }
            }}>
            Save All
          </Button>
          <Button leftIcon={<FaPlay />} colorScheme="teal" variant="solid">
            Run
          </Button>
          <Button leftIcon={<MdPublish />} colorScheme="orange" variant="solid">
            Publish
          </Button>
          <Button leftIcon={<IoMdShare />} colorScheme="red" variant="solid">
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
      {/* <Button
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
      </Button> */}

      <Button
        colorScheme="blue"
        size="md"
        className="mx-[5px]"
        onClick={async () => {
          try {
            const bpmnParser = new BpmnParser();
            const processProperties = getProcessFromLocalStorage(
              processID as string
            );
            const variableList = getVariableItemFromLocalStorage(
              processID as string
            );
            const robotCode = bpmnParser.parse(
              processProperties.xml,
              processProperties.activities,
              variableList ? variableList.variables : []
            );
            console.log(robotCode);
          } catch (error) {
            toast({
              title: (error as Error).message,
              status: 'error',
              position: 'bottom-right',
              duration: 1000,
              isClosable: true,
            });
          }
        }}>
        Compile Robot
      </Button>

      <VariablesSideBar processID={processID as string} />
      <br />
    </div>
  );
}

export default CustomModeler;
