import { Process } from '@/types/process';
import { getLocalStorageObject } from './localStorageService';
import { Activity } from '@/types/activity';

const generateProcessID = () => {
  return (
    'Process_' +
    Array.from({ length: 7 }, () =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
        Math.floor(Math.random() * 62)
      )
    ).join('')
  );
};

const defaultXML = (processID: string) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1htzell" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="14.0.0">
    <bpmn:process id="${processID}" isExecutable="false">
      <bpmn:startEvent id="StartEvent_0vr9as6" />
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${processID}">
        <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_0vr9as6">
          <dc:Bounds x="152" y="82" width="36" height="36" />
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`;
};

const initProcess = (
  processID: string,
  xml: string,
  processName: string
): Process => {
  return {
    processID: processID,
    xml: xml,
    processName: processName,
    activities: [
      {
        activityID: 'StartEvent_0vr9as6',
        activityType: 'bpmn:StartEvent',
        properties: [],
      },
    ],
    variables: [],
  };
};

const getProcessFromLocalStorage = (processID: string) => {
  return getLocalStorageObject('processList').find(
    (process: Process) => process.processID === processID
  );
};

const updateLocalStorage = (newObj: Process) => {
  const oldObj = getLocalStorageObject('processList');
  const res = oldObj.map(
    (obj: Process) => [newObj].find((o) => o.processID === obj.processID) || obj
  );
  return res;
};

const getIndexByProcessID = (processID: string) => {
  const currLocalStorage = getLocalStorageObject('processList');
  return currLocalStorage.findIndex((x: Process) => x.processID === processID);
};

const replaceLocalStorage = (processID: string, newObj: Process) => {
  const index = getIndexByProcessID(processID);
  console.log(index);
  const currLocalStorage = getLocalStorageObject('processList');
  currLocalStorage[index] = newObj;
  return currLocalStorage;
};

const getActivityInProcess = (processID: string, activityID: string) => {
  return getProcessFromLocalStorage(processID).activities.find(
    (activity: Activity) => activity.activityID === activityID
  );
};

const updateActivitesByProcessID = (processID: string, newObj: Activity[]) => {
  const updateActivityObj = {
    ...getProcessFromLocalStorage(processID),
    activites: newObj,
  };
  console.log(updateActivityObj);
};

export {
  generateProcessID,
  getProcessFromLocalStorage,
  getActivityInProcess,
  updateActivitesByProcessID,
  initProcess,
  defaultXML,
  replaceLocalStorage,
  updateLocalStorage,
};
