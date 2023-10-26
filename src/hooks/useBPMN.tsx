import { useState } from 'react';
import {
  ImportXMLResult,
  ModdleElement,
  SaveXMLOptions,
  SaveXMLResult,
} from 'bpmn-js/lib/BaseViewer';
import { BpmnJsReactHook } from '@/interfaces/BpmnJsReactHook';

export const useBpmnJsReact: BpmnJsReactHook = () => {
  const [bpmnModeler, setBpmnModeler] = useState<ReturnType<any>>(null);

  const getCanvas = () => bpmnModeler?.get('canvas');

  const importXml: (
    xml: string,
    bpmnDiagram?: ModdleElement | string
  ) => Promise<ImportXMLResult> = (xml: string) => {
    return bpmnModeler?.importXML(xml);
  };

  const saveXml = (
    callback: (err: any, xml: string) => void,
    options: SaveXMLOptions = {
      format: false,
    }
  ) => {
    bpmnModeler?.saveXML(options, callback);
  };

  const saveXmlAsync: (
    options?: SaveXMLOptions
  ) => Promise<SaveXMLResult> = async (options = { format: false }) =>
    bpmnModeler?.saveXML(options);

  const getElements = () => {
    return bpmnModeler?.get('elementRegistry').getAll();
  };
  const getElementById = (id: string) => {
    return bpmnModeler?.get('elementRegistry').get(id);
  };
  //STYLING

  const zoomIn = (step = 0.1) => {
    bpmnModeler?.get('zoomScroll')?.zoom(step);
  };
  const zoomOut = (step = 0.1) => {
    bpmnModeler?.get('zoomScroll')?.zoom(-step);
  };
  const zoomFit = () => {
    bpmnModeler?.get('zoomScroll')?.zoom('fit-viewport');
  };
  const setStyle = () => {
    const canvas = bpmnModeler?.get('canvas');
    canvas?.zoom('fit-viewport');
  };
  const addMarker = (id: string, cssClass: string) => {
    bpmnModeler.get('canvas').addMarker(id, cssClass);
  };
  const removeMarker = (id: string, cssClass: string) => {
    bpmnModeler?.get('canvas').removeMarker(id, cssClass);
  };
  const setColor = (elements: any, color: any) => {
    bpmnModeler.get('modeling').setColor(elements, color);
  };

  //PROPERTIES
  const getElementRegistry = () => bpmnModeler?.get('elementRegistry');

  const getBusinessObject = (id: string) => {
    return getElementRegistry()?.get(id).businessObject;
  };

  const getAttribute = (id: string, key: string) => {
    return getBusinessObject(id)[key];
  };

  const setAttribute = (id: any, name: string, value: any) => {
    getBusinessObject(id)[name] = value;
  };

  const getIncoming = (id: string) => {
    return getBusinessObject(id).incoming;
  };

  const getOutgoing = (id: string) => {
    return getBusinessObject(id).outgoing;
  };

  return {
    bpmnModeler,
    setBpmnModeler,
    importXml,
    saveXml,
    saveXmlAsync,
    getCanvas,
    getElements,
    getElementById,
    getBusinessObject,
    zoomIn,
    zoomOut,
    zoomFit,
    setStyle,
    setColor,
    addMarker,
    removeMarker,
    getAttribute,
    setAttribute,
    getIncoming,
    getOutgoing,
  };
};
