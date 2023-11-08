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
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import { defaultBpmnXml } from './bpmn.default';
import removeUnsupportedBpmnFunctions from './removeTrackPad';

const BpmnJsModeler: ForwardRefRenderFunction<
  BpmnJsReactHandle,
  BpmnJsReactProps
> = (
  {
    useBpmnJsReact,
    xml = defaultBpmnXml,
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
    bpmnEditor?.importXML(xml);
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
  }, [bpmnEditor, xml]);

  useImperativeHandle(
    ref,
    () => ({
      saveXml(result: any, options = { format: false }) {
        bpmnEditor?.saveXML(options);
      },
      async saveXmlAsync(result: any, options = { format: false }) {
        return await bpmnEditor?.saveXML(options);
      },
      importXml(xml: string) {
        bpmnEditor?.importXML(xml);
      },
      getModeler() {
        return bpmnEditor;
      },
      getCanvas() {
        return bpmnEditor?.get('canvas');
      },
      zoomIn(step = 0.1) {
        (bpmnEditor as any).get('zoomScroll').stepZoom(step);
      },
      zoomOut(step = 0.1) {
        (bpmnEditor as any).get('zoomScroll').stepZoom(-step);
      },
      zoomFit() {
        (bpmnEditor as any).get('canvas').zoom('fit-viewport');
      },
      setColor(elements: any, color: any) {
        (bpmnEditor as any).get('modeling').setColor(elements, color);
      },
      addMarker(id: string, cssClass: string) {
        (bpmnEditor as any).get('canvas').addMarker(id, cssClass);
      },
      removeMarker(id: string, cssClass: string) {
        (bpmnEditor as any).get('canvas').removeMarker(id, cssClass);
      },
    }),
    [bpmnEditor]
  );

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
