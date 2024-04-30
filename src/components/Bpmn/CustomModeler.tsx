import { useBpmn } from '@/hooks/useBpmn';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useEffect, useRef, useState } from 'react';
import BpmnJsReact from './BpmnJsReact';
import {
  Box,
  Button,
  IconButton,
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
import FunctionalTabBar from './FunctionalTabBar/FunctionalTabBar';
import DisplayRobotCode from './DisplayRobotCode/DisplayRobotCode';
import { BpmnParseError } from '@/utils/bpmn-parser/error';

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
  const [errorTrace, setErrorTrace] = useState<string>('');
  const isSavedChanges = useSelector(bpmnSelector);

  const processName = router?.query?.name as string;
  const version = router?.query?.version as string;

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
    // console.log('Payload Storage', payloadStorage);
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

  const mutateSaveAll = useMutation({
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

  const handleSaveAll = () => {
    const processProperties = getProcessFromLocalStorage(processID as string);
    if (!processProperties) {
      toast({
        title: 'There are some errors, please refresh the page!',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    } else {
      const variableListByID = getVariableItemFromLocalStorage(
        processID as string
      );
      const refactoredVariables = convertToRefactoredObject(variableListByID);
      const payload = {
        xml: processProperties.xml,
        activities: processProperties.activities,
        variables: refactoredVariables ?? {},
      };
      mutateSaveAll.mutate(payload);
    }
  };

  const compileRobotCode = (processID: string) => {
    try {
      const bpmnParser = new BpmnParser();
      const processProperties = getProcessFromLocalStorage(processID as string);
      const variableList = getVariableItemFromLocalStorage(processID as string);
      const robotCode = bpmnParser.parse(
        processProperties.xml,
        processProperties.activities,
        variableList ? variableList.variables : []
      );

      // toast({
      //   title: 'Compile Successfully!',
      //   status: 'success',
      //   position: 'bottom-right',
      //   duration: 1000,
      //   isClosable: true,
      // });

      return robotCode;
    } catch (error) {
      setErrorTrace(error.stack.toString());
      // let _bpmnId = error.bpmnId.split(",")[0]
      // console.log(_bpmnId)
      // bpmnReactJs.addMarker(_bpmnId, "djs-search-overlay");

      if (error instanceof BpmnParseError) {
        toast({
          title: error.message + ': ' + error.bpmnId,
          status: 'error',
          position: 'bottom-right',
          duration: 1000,
          isClosable: true,
        });
      }
      toast({
        title: (error as Error).message,
        status: 'error',
        position: 'bottom-right',
        duration: 1000,
        isClosable: true,
      });
    }
  };

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
          <Box>
            <h1 className="text-primary font-bold text-2xl mx-[20px]">
              {processID}{' '}
              {!isSavedChanges.isSaved && (
                <span className="text-red-500">{'*'}</span>
              )}
            </h1>
            <Box className="flex justify-between items-center">
              <h1 className="text-gray-500 text-xl mx-[20px]">
                Name: {processName || ''}
              </h1>
            </Box>
          </Box>
        </Box>

        <FunctionalTabBar
          processID={processID as string}
          genRobotCode={compileRobotCode}
          onSaveAll={handleSaveAll}
        />
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
          // console.log(res.xml);
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
      </Button> */}

      {/* <Button
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

      <DisplayRobotCode
        compileRobotCode={() => compileRobotCode(processID as string)}
        errorTrace={errorTrace}
        setErrorTrace={setErrorTrace}
      />

      <VariablesSideBar processID={processID as string} />
      <br />
    </div>
  );
}

export default CustomModeler;
