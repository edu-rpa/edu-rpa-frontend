import { useBpmnJsReact } from '@/hooks/useBPMN';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useRef, useState } from 'react';
import BpmnJsReact from './BpmnJsReact';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModelerSideBar from './ModelerSidebar';
import { BpmnParser } from '@/utils/bpmn-parser/bpmn-parser.util';
//@ts-ignore
import { saveAs } from 'file-saver';

function CustomModeler() {
  const ref = useRef<BpmnJsReactHandle>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  return (
    <div className="mt-[100px]">
      <BpmnJsReact mode="edit" useBpmnJsReact={bpmnReactJs} ref={ref} />
      {bpmnReactJs.bpmnModeler && (
        <div>
          <ModelerSideBar
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            modeler={bpmnReactJs.bpmnModeler}
          />
        </div>
      )}
      <Button
        colorScheme="teal"
        size="md"
        onClick={async () => {
          const res = await bpmnReactJs.bpmnModeler.saveXML({ format: true });
          exportFile(res.xml, 'test.xml');
        }}>
        Save XML
      </Button>
      <Button
        colorScheme="blue"
        size="md"
        className="ml-[10px]"
        onClick={async () => {
          const res = await bpmnReactJs.bpmnModeler.saveXML({ format: true });
          const bpmnParser = new BpmnParser();
          const jsonProcess = stringifyCyclicObject(
            bpmnParser.parseXML(res.xml)
          );
          exportFile(jsonProcess, 'test.json');
        }}>
        Save JSON
      </Button>
      <br />
    </div>
  );
}

export default CustomModeler;
