import React from 'react';
import PropertiesSideBar from '../PropertiesSideBar/PropertiesSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { bpmnSelector } from '@/redux/selector';
import { updateBPMN } from '@/redux/slice/bpmnSlice';

interface ModelerSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  modeler: any;
}

export default function ModelerSideBar(props: ModelerSideBarProps) {
  const [activityItem, setActivityItem] = React.useState({
    processId: '',
    activityId: '',
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
        processId: event.newSelection[0].businessObject.$parent.id,
        activityId: event.newSelection[0].businessObject.id,
        activityName: event.newSelection[0].businessObject.name,
        activityType: event.newSelection[0].businessObject.$type,
        incoming: getFlowInfo(event.newSelection[0].businessObject.incoming),
        outgoing: getFlowInfo(event.newSelection[0].businessObject.outgoing),
      };
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
