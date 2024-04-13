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
import BpmnColorPickerModule from 'bpmn-js-color-picker';
//@ts-ignore
import gridModule from 'diagram-js-grid';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import { useParams } from 'next/navigation';
import { QUERY_KEY } from '@/constants/queryKey';
import processApi from '@/apis/processApi';
import { useQuery } from '@tanstack/react-query';
import CustomContextPadProvider from './CustomContextPadProvider';

const BpmnJsModeler: ForwardRefRenderFunction<
  BpmnJsReactHandle,
  BpmnJsReactProps
> = (
  {
    useBpmnJsReact,
    height,
    onError = () => {},
    onShown = () => {},
  }: BpmnJsReactProps,
  ref
) => {
  const params = useParams();
  const [bpmnEditor, setBpmnEditor] = useState<CamundaBpmnModeler | null>(null);

  const { data: processDetail, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PROCESS_DETAIL],
    queryFn: () => processApi.getProcessByID(params.id as string),
  });

  useEffect(() => {
    const newModeler = new CamundaBpmnModeler({
      container: '#bpmnview',
      keyboard: {
        bindTo: window,
      },
      additionalModules: [
        CustomContextPadProvider,
        BpmnColorPickerModule,
        gridModule,
      ],
      height: '80vh',
    });
    useBpmnJsReact?.setBpmnModeler(newModeler);
    setBpmnEditor(newModeler);
    return () => bpmnEditor?.destroy();
  }, []);

  useEffect(() => {
    if (isLoading && !processDetail) return;
    bpmnEditor?.importXML(processDetail?.xml as string);
    bpmnEditor?.on('import.done', (event: any) => {
      const { error, warning } = event;
      if (error) {
        return onError(error);
      }
      zoomFit();
      onShown(warning);
    });
  }, [bpmnEditor]);

  const zoomFit = () => {
    (bpmnEditor as any).get('canvas').zoom('fit-viewport');
  };

  return (
    <div className="bpmn-wrapper">
      <div id="bpmnview"></div>
    </div>
  );
};

export default forwardRef(BpmnJsModeler);
