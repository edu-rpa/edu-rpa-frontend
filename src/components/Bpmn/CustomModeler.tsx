import { useBpmn } from '@/hooks/useBpmn';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useEffect, useRef, useState } from 'react';
import BpmnJsReact from './BpmnJsReact';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModelerSideBar from './ModelerSidebar';
import { BpmnParser } from '@/utils/bpmn-parser/bpmn-parser.util';
//@ts-ignore
import { saveAs } from 'file-saver';
import { useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import {
  getProcessFromLocalStorage,
  replaceLocalStorage,
  updateLocalStorage,
} from '@/utils/processService';
import { useRouter } from 'next/router';

function CustomModeler() {
  const router = useRouter();
  const ref = useRef<BpmnJsReactHandle>(null);
  const params = useParams();
  const [processId, setProcessID] = useState(params.id as string);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const bpmnReactJs = useBpmn();
  const modelerElements = bpmnReactJs.bpmnModeler
    ? bpmnReactJs.getElements().length
    : 0;

  useEffect(() => {
    router.push(`/studio/modeler/${processId}`);
  }, [processId]);

  useEffect(() => {
    if (modelerElements == 0) return;
    const updateModeler = async () => {
      const data = await bpmnReactJs.saveXML();
      return data.xml;
    };
    bpmnReactJs.bpmnModeler &&
      updateModeler().then((xml) => {
        const newObj = { ...getProcessFromLocalStorage(processId), xml: xml };
        const newLocalStorage = updateLocalStorage(newObj);
        setLocalStorageObject('processList', newLocalStorage);
        console.log(getLocalStorageObject('processList'));
      });
  }, [modelerElements]);

  const exportFile = (content: string, fileName: string) => {
    var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  };

  const stringifyCyclicObject = (content: any) => {
    const seen: any = [];
    return JSON.stringify(content, function (key, val) {
      if (val != null && typeof val == 'object') {
        if (seen.indexOf(val) >= 0) {
          return;
        }
        seen.push(val);
      }
      return val;
    });
  };

  const handleImportBPMN = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const xml = e.target?.result;
          await bpmnReactJs.importXML(xml as string);
          const elementList = bpmnReactJs.getElementList();
          console.log(elementList);
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
          setLocalStorageObject('processList', replaceStorageSnapshot);
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
    <div className="mt-[120px]">
      <h1 className="text-primary font-bold text-2xl mx-[20px]">{processId}</h1>
      <BpmnJsReact mode="edit" useBpmnJsReact={bpmnReactJs} ref={ref} />
      {bpmnReactJs.bpmnModeler && (
        <ModelerSideBar
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          modeler={bpmnReactJs.bpmnModeler}
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
        colorScheme="orange"
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
      <Button
        colorScheme="teal"
        size="md"
        className="mx-[5px]"
        onClick={async () => {
          const res = await bpmnReactJs.saveXML();
          exportFile(res.xml as string, `${processId}.xml`);
          // console.log(res.xml);
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
          // console.log(bpmnParser.parseXML(res.xml));
        }}>
        Save JSON
      </Button>
      <br />
    </div>
  );
}

export default CustomModeler;
