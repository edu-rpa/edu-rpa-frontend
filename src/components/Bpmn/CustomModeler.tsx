import { useBpmn } from '@/hooks/useBpmn';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useRef, useState } from 'react';
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
import { useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { setLocalStorageObject } from '@/utils/localStorageService';
import {
  getProcessFromLocalStorage,
  replaceLocalStorage,
} from '@/utils/processService';
import { useRouter } from 'next/router';
import VariablesSideBar from './VariablesSideBar/VariablesSideBar';
import { LocalStorage } from '@/constants/localStorage';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { exportFile, stringifyCyclicObject } from '@/utils/common';
import { FaPlay } from 'react-icons/fa';
import { MdPublish } from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';

function CustomModeler() {
  const router = useRouter();
  const ref = useRef<BpmnJsReactHandle>(null);
  const params = useParams();
  const bpmnReactJs = useBpmn();
  const [processId, setProcessID] = useState(params.id as string);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImportBPMN = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const xml = e.target?.result;
          await bpmnReactJs.importXML(xml as string);
          const elementList = bpmnReactJs.getElementList();
          const processID = elementList[0].activityID;
          const activities = elementList.slice(1);
          const newImportStorage = {
            ...getProcessFromLocalStorage(processId),
            processID: processID,
            xml: xml,
            activities: activities,
          };
          const replaceStorageSnapshot = replaceLocalStorage(
            processId,
            newImportStorage
          );
          setLocalStorageObject(
            LocalStorage.PROCESS_LIST,
            replaceStorageSnapshot
          );
          setProcessID(processID);
          router.push(`/studio/modeler/${processID}`);
        } catch (err) {
          toast({
            title: 'File is not a XML file',
            description: 'Please import XML/BPMN files',
            position: 'top-right',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      };
      reader.readAsText(file);
    }
  };

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
            {processId}
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
      <input
        type="file"
        id="myFile"
        name="filename"
        className="hidden"
        ref={inputFileRef}
        onChange={handleImportBPMN}
      />
      <Button
        colorScheme="teal"
        size="md"
        className="mx-[5px]"
        onClick={() => {
          if (inputFileRef.current) {
            inputFileRef.current.click();
          } else {
            console.error('BPMN file not found!');
          }
        }}>
        Import XML
      </Button>

      {/* <Button
        colorScheme="teal"
        size="md"
        className="mx-[5px]"
        onClick={async () => {
          const res = await bpmnReactJs.saveXML();
          exportFile(res.xml as string, `${processId}.xml`);
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
          exportFile(jsonProcess, `${processId}.json`);
          console.log(bpmnParser.parseXML(res.xml as string));
        }}>
        Save JSON
      </Button>
       */}
      <Button
        colorScheme="orange"
        size="md"
        className="mx-[5px]"
        onClick={() => {
          const processProperties = getProcessFromLocalStorage(processId);
          console.log(processProperties);
          delete processProperties['xml'];
          exportFile(
            JSON.stringify(processProperties),
            `${processId}_properties.json`
          );
        }}>
        Save Properties
      </Button>
      <VariablesSideBar processID={processId} />
      <br />
    </div>
  );
}

export default CustomModeler;
