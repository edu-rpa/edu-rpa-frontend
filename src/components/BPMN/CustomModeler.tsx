import { useBpmnJsReact } from '@/hooks/useBpmnJs';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useRef, useState } from 'react';
import BpmnJsReact from './BpmnJsReact';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModelerSideBar from './ModelerSidebar';
import { BpmnParser } from '@/utils/bpmn-parser/bpmn-parser.util';
//@ts-ignore
import { saveAs } from 'file-saver';
import { useToast } from '@chakra-ui/react';

function CustomModeler() {
  const ref = useRef<BpmnJsReactHandle>(null);
  const [processID, setProcessID] = useState('Process_1xkz8m2');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const bpmnReactJs = useBpmnJsReact();

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
          await bpmnReactJs.bpmnModeler.importXML(xml);
          const allEvents = bpmnReactJs.bpmnModeler
            .get('elementRegistry')
            .getAll()
            .map((item: any) => {
              return item.id;
            });
          const [processID, ...activitiesArray] = allEvents;
          const activities = activitiesArray.reduce(
            (acc: any, activity: any) => {
              acc[activity] = {};
              return acc;
            },
            {}
          );
          const output = { processID, activities };
          localStorage.setItem('processData', JSON.stringify(output));
          setProcessID(processID);
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
      <h1 className="text-primary font-bold text-2xl mx-[20px]">{processID}</h1>
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
          const res = await bpmnReactJs.bpmnModeler.saveXML({ format: true });
          exportFile(res.xml, 'test.xml');
          console.log(res.xml);
        }}>
        Save XML
      </Button>
      <Button
        colorScheme="blue"
        size="md"
        className="mx-[5px]"
        onClick={async () => {
          const res = await bpmnReactJs.bpmnModeler.saveXML({ format: true });
          const bpmnParser = new BpmnParser();
          const jsonProcess = stringifyCyclicObject(
            bpmnParser.parseXML(res.xml)
          );
          exportFile(jsonProcess, 'test.json');
          console.log(bpmnParser.parseXML(res.xml));
        }}>
        Save JSON
      </Button>
      <br />
    </div>
  );
}

export default CustomModeler;
