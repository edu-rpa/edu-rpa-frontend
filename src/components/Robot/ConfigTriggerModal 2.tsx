import { TriggerType } from '@/interfaces/robot';
import ScheduleModal from './ScheduleModal';
import TriggerEventGmailModal from './TriggerEventGmailModal';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  processId: string;
  processVersion: number;
  triggerType: TriggerType;
}

const ConfigTriggerModal = ({
  isOpen,
  onClose,
  userId,
  processId,
  processVersion,
  triggerType,
}: Props) => {
  return (
    {
      [TriggerType.SCHEDULE]: (
        <ScheduleModal
          isOpen={isOpen}
          onClose={onClose}
          userId={userId}
          processId={processId}
          processVersion={processVersion}
        />
      ),
      [TriggerType.EVENT_GMAIL]: (
        <TriggerEventGmailModal
          isOpen={isOpen}
          onClose={onClose}
          userId={userId}
          processId={processId}
          processVersion={processVersion}
        />
      ),
      [TriggerType.MANUAL]: null,
    }[triggerType] || null
  );
};

export default ConfigTriggerModal;
