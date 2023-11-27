import React from 'react';
import PropertiesSideBar from './PropertiesSideBar/PropertiesSideBar';
import {
  getActivityInProcess,
  getProcessFromLocalStorage,
  updateLocalStorage,
} from '@/utils/processService';
import { setLocalStorageObject } from '@/utils/localStorageService';

interface ModelerSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  modeler: any;
}

export default function ModelerSideBar(props: ModelerSideBarProps) {
  const [activityItem, setActivityItem] = React.useState({
    activityID: '',
    activityName: '',
    activityType: '',
    properties: {},
  });

  React.useEffect(() => {
    props.modeler.bpmnModeler.on('selection.changed', async (event: any) => {
      if (!event.newSelection[0]) return;
      const eventInfo = event.newSelection[0].businessObject;
      const processID = eventInfo.$parent.id;
      const currentActivity = {
        activityID: eventInfo.id,
        activityName: eventInfo.name,
        activityType: eventInfo.$type,
        properties: {},
      };
      const isActivityExists = getActivityInProcess(
        processID,
        currentActivity.activityID
      );

      if (isActivityExists) {
        props.onOpen();
      } else {
        const updateModelerAndLocalStorage = async () => {
          const xml = await props.modeler.saveXML();
          const activityList = props.modeler.getElementList();
          const newObj = {
            ...getProcessFromLocalStorage(processID),
            xml: xml.xml,
            activities: activityList.slice(1),
          };
          const newLocalStorage = updateLocalStorage(newObj);
          setLocalStorageObject('processList', newLocalStorage);
        };
        await updateModelerAndLocalStorage();
      }
      setActivityItem(currentActivity);
    });
  }, [activityItem]);

  return (
    <div>
      <PropertiesSideBar
        isOpen={props.isOpen}
        onClose={props.onClose}
        activityItem={activityItem}
      />
    </div>
  );
}
