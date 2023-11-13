import React from 'react';
import PropertiesSideBar from '../PropertiesSideBar/PropertiesSideBar';
import { getProcessFromLocalStorage } from '@/utils/processService';

interface ModelerSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  modeler: any;
}

export default function ModelerSideBar(props: ModelerSideBarProps) {
  const [activityItem, setActivityItem] = React.useState({
    processID: '',
    activityID: '',
    activityName: '',
    activityType: '',
    incoming: [],
    outgoing: [],
  });
  const getFlowInfo = (flowArray: any) => {
    return (
      flowArray?.map((item: any) => {
        return { flowId: item.id, name: item?.name };
      }) || []
    );
  };

  React.useEffect(() => {
    props.modeler.on('selection.changed', (event: any) => {
      if (!event.newSelection[0]) return;
      const currentActivity = {
        processID: event.newSelection[0].businessObject.$parent.id,
        activityID: event.newSelection[0].businessObject.id,
        activityName: event.newSelection[0].businessObject.name,
        activityType: event.newSelection[0].businessObject.$type,
        incoming: getFlowInfo(event.newSelection[0].businessObject.incoming),
        outgoing: getFlowInfo(event.newSelection[0].businessObject.outgoing),
      };
      console.log('ProcessID', currentActivity.processID);
      console.log('Activity', currentActivity.activityID);
      console.log('ActivityType', currentActivity.activityType);
      console.log(
        'LocalStorage',
        getProcessFromLocalStorage(currentActivity.processID)
      );
      setActivityItem(currentActivity);
      props.onOpen();
    });
  }, [props.modeler, activityItem]);

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
