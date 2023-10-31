import React from 'react';
import PropertiesSideBar from '../PropertiesSideBar/PropertiesSideBar';

interface ModelerSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  modeler: any;
}

export default function ModelerSideBar(props: ModelerSideBarProps) {
  const [activityItem, setActivityItem] = React.useState({
    processId: undefined,
    activityId: undefined,
    activityName: undefined,
    activityType: undefined,
    incoming: undefined,
    outgoing: undefined,
  });
  React.useEffect(() => {
    props.modeler.on('selection.changed', (event: any) => {
      if (!event.newSelection[0]) return;
      const currentActivity = {
        processId: event.newSelection[0].businessObject.$parent.id,
        activityId: event.newSelection[0].businessObject.id,
        activityName: event.newSelection[0].businessObject.name,
        activityType: event.newSelection[0].businessObject.$type,
        incoming: event.newSelection[0].businessObject.incoming,
        outgoing: event.newSelection[0].businessObject.outgoing,
      };
      setActivityItem(currentActivity);
    });
  }, [props.modeler, activityItem]);

  console.log(activityItem);

  return (
    <div>
      <PropertiesSideBar isOpen={props.isOpen} onClose={props.onClose} />
    </div>
  );
}
