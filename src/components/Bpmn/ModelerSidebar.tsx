import React from 'react';
import PropertiesSideBar from './PropertiesSideBar/PropertiesSideBar';
import {
  getActivityInProcess,
  getProcessFromLocalStorage,
  updateLocalStorage,
} from '@/utils/processService';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '@/utils/localStorageService';
import { Activity } from '@/types/activity';

interface ModelerSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  modeler: any;
  setModelerLength: any;
}

export default function ModelerSideBar(props: ModelerSideBarProps) {
  const [activityItem, setActivityItem] = React.useState({
    processID: '',
    activityID: '',
    activityName: '',
    activityType: '',
    properties: [],
  });

  React.useEffect(() => {
    props.modeler.on('selection.changed', async (event: any) => {
      if (!event.newSelection[0]) return;
      const eventInfo = event.newSelection[0].businessObject;
      const currentActivity = {
        processID: eventInfo.$parent.id,
        activityID: eventInfo.id,
        activityName: eventInfo.name,
        activityType: eventInfo.$type,
        properties: [],
      };
      const processID = currentActivity.processID;
      const currentProcess = getProcessFromLocalStorage(processID);
      const isActivityExists = getActivityInProcess(
        processID,
        currentActivity.activityID
      );
      if (!isActivityExists) {
        const newUpdateStorage = {
          ...currentProcess,
          activities: [...currentProcess.activities, currentActivity],
        };
        setLocalStorageObject(
          'processList',
          updateLocalStorage(newUpdateStorage)
        );
      } else {
        props.onOpen();
      }
      props.setModelerLength(currentProcess.activities.length);
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
