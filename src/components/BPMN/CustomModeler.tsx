import { useBpmnJsReact } from '@/hooks/useBPMN';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useRef, useState } from 'react';
import BpmnJsReact from './BpmnJsReact';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModelerSideBar from './ModelerSidebar';

function CustomModeler() {
  const ref = useRef<BpmnJsReactHandle>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bpmnReactJs = useBpmnJsReact();

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
          console.log(res.xml);
        }}>
        Save XML
      </Button>
      <Button
        colorScheme="blue"
        size="md"
        className="ml-[10px]"
        onClick={async () => {
          const res = await bpmnReactJs.bpmnModeler.saveXML({ format: true });
          console.log(res.xml);
        }}>
        Save JSON
      </Button>
      <br />
    </div>
  );
}

export default CustomModeler;
