import { useState } from 'react';
import {
  ImportXMLResult,
  ModdleElement,
  SaveXMLOptions,
} from 'bpmn-js/lib/BaseViewer';
import { BpmnJsReactHook } from '@/interfaces/BpmnJsReactHook';
//@ts-ignore
import { BpmnModeler as IBpmnModeler } from 'bpmn-js/lib/Modeler';

export const useBpmn: BpmnJsReactHook = () => {
  const [bpmnModeler, setBpmnModeler] =
    useState<ReturnType<IBpmnModeler>>(null);

  const getCanvas = () => {
    return bpmnModeler.get('canvas');
  };

  const getEventBus = () => {
    return bpmnModeler.get('eventBus');
  };

  const importXML: (
    xml: string,
    bpmnDiagram?: ModdleElement | string
  ) => Promise<ImportXMLResult> = (xml: string) => {
    return bpmnModeler.importXML(xml);
  };

  const saveXML = (
    options: SaveXMLOptions = {
      format: true,
    }
  ) => {
    return bpmnModeler.saveXML(options);
  };
  const getElementRegistry = () => {
    return bpmnModeler.get('elementRegistry');
  };

  const getElements = () => {
    return bpmnModeler.get('elementRegistry').getAll();
  };
  const getElementById = (id: string) => {
    return bpmnModeler.get('elementRegistry').get(id);
  };

  const zoomIn = (step = 0.1) => {
    bpmnModeler.get('zoomScroll')?.zoom(step);
  };
  const zoomOut = (step = 0.1) => {
    bpmnModeler.get('zoomScroll')?.zoom(-step);
  };
  const zoomFit = () => {
    bpmnModeler.get('zoomScroll')?.zoom('fit-viewport');
  };
  const setStyle = () => {
    const canvas = bpmnModeler.get('canvas');
    canvas.zoom('fit-viewport');
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

  const getBusinessObject = (id: string) => {
    return getElementRegistry().get(id).businessObject;
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
    importXML,
    saveXML,
    getCanvas,
    getEventBus,
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
