import { useBpmnJsReact } from '@/hooks/useBPMN';
import { BpmnJsReactHandle } from '@/interfaces/bpmnJsReact.interface';
import { useRef, useState } from 'react';
import BpmnJsReact from './BpmnJsReact';

function CustomModeler() {
  const ref = useRef<BpmnJsReactHandle>(null);

  const [elements, setElements] = useState<any>([]);

  const bpmnReactJs = useBpmnJsReact();

  return (
    <div className="mt-[100px]">
      <BpmnJsReact
        mode="edit"
        useBpmnJsReact={bpmnReactJs}
        ref={ref}
        click={(e: any) => setElements([e.element])}
      />
      <button
        onClick={async () => {
          const res = await bpmnReactJs.bpmnModeler.saveXML(
            { format: true },
            function (err: any, xml: any) {
              if (err) {
                console.error(err);
              } else {
                console.log(xml);
              }
            }
          );
          console.log(res.xml);
        }}>
        Save
      </button>

      <button
        onClick={() => {
          console.log(elements);
          console.log(
            bpmnReactJs.setColor(elements, {
              stroke: '#00ff00',
              fill: '#ffff00',
            })
          );
        }}>
        set color
      </button>
      <button
        onClick={() => {
          console.log(
            bpmnReactJs.setColor(elements, {
              stroke: 'black',
              fill: 'white',
            })
          );
        }}>
        clear color
      </button>
      <button
        onClick={() => {
          elements.forEach((element: any) => {
            ref.current?.addMarker(element.id, 'highlight');
          });
        }}>
        addMarker
      </button>
      <button
        onClick={() => {
          elements.forEach((element: any) => {
            ref.current?.removeMarker(element.id, 'highlight');
          });
        }}>
        removeMarker
      </button>
      <button
        onClick={() => {
          bpmnReactJs.setAttribute(elements[0]?.id, 'property', {
            name: 'test',
          });
        }}>
        setAttribute
      </button>
      <button
        onClick={() => {
          const attr = bpmnReactJs.getAttribute(elements[0]?.id, 'property');

          console.log(attr);
        }}>
        getAttribute
      </button>
      <button
        onClick={() => {
          const incoming = bpmnReactJs.getIncoming(elements[0]?.id);

          console.log(incoming);
        }}>
        get Incoming
      </button>
      <button
        onClick={() => {
          const outgoing = bpmnReactJs.getOutgoing(elements[0]?.id);

          console.log(outgoing);
        }}>
        get outgoing
      </button>
      <br />
    </div>
  );
}

export default CustomModeler;
