import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import CamundaBpmnModeler from 'bpmn-js/lib/Modeler';
import {
  BpmnJsReactHandle,
  BpmnJsReactProps,
} from '@/interfaces/bpmnJsReact.interface';
//@ts-ignore
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
//@ts-ignore
import CliModule from 'bpmn-js-cli';
//@ts-ignore
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import removeUnsupportedBpmnFunctions from './removeTrackPad';
import { useParams } from 'next/navigation';
import { getProcessFromLocalStorage } from '@/utils/processService';

const BpmnJsModeler: ForwardRefRenderFunction<
  BpmnJsReactHandle,
  BpmnJsReactProps
> = (
  {
    useBpmnJsReact,
    height = 600,
    zoomActions = true,
    onLoading = () => {},
    onError = () => {},
    onShown = () => {},
    click = () => {},
    dbclick = () => {},
    ...props
  }: BpmnJsReactProps,
  ref
) => {
  const params = useParams();
  const currentProcess = getProcessFromLocalStorage(params.id as string);
  const [bpmnEditor, setBpmnEditor] = useState<CamundaBpmnModeler | null>(null);

  useEffect(() => {
    const newModeler = new CamundaBpmnModeler({
      container: '#bpmnview',
      keyboard: {
        bindTo: window,
      },
      additionalModules: [
        {
          __init__: ['customContextPadProvider'],
          customContextPadProvider: ['type', removeUnsupportedBpmnFunctions()],
        },
        BpmnColorPickerModule,
        propertiesProviderModule,
        CliModule,
      ],
      cli: {
        bindTo: 'cli',
      },
    });
    useBpmnJsReact?.setBpmnModeler(newModeler);
    setBpmnEditor(newModeler);
    return () => bpmnEditor?.destroy();
  }, []);

  useEffect(() => {
    if (!currentProcess) return;
    bpmnEditor?.importXML(currentProcess.xml);
    bpmnEditor?.on('import.done', (event: any) => {
      const { error, warning } = event;
      if (error) {
        return onError(error);
      }
      zoomFit();
      onShown(warning);
    });

    bpmnEditor?.on('element.click', (e: any) => {
      click(e);
    });
  }, [bpmnEditor]);

  const zoomFit = () => {
    (bpmnEditor as any).get('canvas').zoom('fit-viewport');
  };

  return (
    <>
      <div className="bpmn-wrapper">
        <div id="bpmnview" style={{ height }}></div>
      </div>
    </>
  );
};

export default forwardRef(BpmnJsModeler);
