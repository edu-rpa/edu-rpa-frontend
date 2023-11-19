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
  setIsEdit: any;
}

export default function ModelerSideBar(props: ModelerSideBarProps) {
  const [activityItem, setActivityItem] = React.useState({
    activityID: '',
    activityName: '',
    activityType: '',
    properties: {},
  });

  React.useEffect(() => {
    props.modeler.on('selection.changed', async (event: any) => {
      if (!event.newSelection[0]) return;
      const eventInfo = event.newSelection[0].businessObject;
      const processID = eventInfo.$parent.id;
      const currentActivity = {
        activityID: eventInfo.id,
        activityName: eventInfo.name,
        activityType: eventInfo.$type,
        properties: {},
      };
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
        props.setIsEdit(true);
      } else {
        props.onOpen();
        props.setIsEdit(false);
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
