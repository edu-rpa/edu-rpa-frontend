import React from 'react';
import PropertiesSideBar from './PropertiesSideBar/PropertiesSideBar';
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
    properties: [],
  });
  const getFlowInfo = (flowArray: any) => {
    return (
      flowArray?.map((item: any) => {
        return { flowId: item.id, name: item?.name };
      }) || []
    );
  };

  React.useEffect(() => {
    props.modeler.on('selection.changed', async (event: any) => {
      if (!event.newSelection[0]) return;
      const eventInfo = event.newSelection[0].businessObject;
      const currentActivity = {
        processID: eventInfo.$parent.id,
        activityID: eventInfo.id,
        activityName: eventInfo.name,
        activityType: eventInfo.$type,
        incoming: getFlowInfo(eventInfo.incoming),
        outgoing: getFlowInfo(eventInfo.outgoing),
        properties: [],
      };
      console.log(currentActivity);
      setActivityItem(currentActivity);
      // props.onOpen();
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
