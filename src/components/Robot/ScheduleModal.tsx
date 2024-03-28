import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import robotApi from '@/apis/robotApi';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import { useSelector, useDispatch } from 'react-redux';
import { scheduleSelector } from '@/redux/selector';
import {
  ScheduleState,
  setSchedule,
  setScheduleName,
  resetSchedule,
} from '@/redux/slice/scheduleSlice';
import ScheduleForm from './ScheduleForm';
import { toastError, toastSuccess } from '@/utils/common';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  processId: string;
  processVersion: number;
}

const generateExpression = (schedule: ScheduleState) => {
  if (schedule.type === 'at') {
    return `at(${schedule.datetime}:00)`;
  }

  return `cron(${schedule.minute} ${schedule.hour} ${schedule.dayOfMonth} ${schedule.month} ${schedule.dayOfWeek} ${schedule.year})`;
};

const ScheduleModal = ({
  isOpen,
  onClose,
  userId,
  processId,
  processVersion,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const schedule = useSelector(scheduleSelector);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await robotApi.getSchedule(
          userId,
          processId,
          processVersion
        );
        if (res.Name) {
          dispatch(setSchedule(res));
        }
      } catch (error) {
        toastError(toast, 'Failed to fetch schedule');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId, processId, processVersion]);

  const handleCreateSchedule = async () => {
    setIsLoading(true);
    try {
      await robotApi.createSchedule(userId, processId, processVersion, {
        schedule_expression: generateExpression(schedule),
        schedule_expression_timezone: schedule.timezone,
      });
      toastSuccess(toast, 'Schedule created');
      dispatch(
        setScheduleName(
          `edu-rpa-robot-schedule.${userId}.${processId}.${processVersion}`
        )
      );
    } catch (error) {
      toastError(toast, 'Failed to create schedule');
    }
    setIsLoading(false);
  };

  const handleUpdateSchedule = async () => {
    setIsLoading(true);
    try {
      await robotApi.updateSchedule(userId, processId, processVersion, {
        schedule_expression: generateExpression(schedule),
        schedule_expression_timezone: schedule.timezone,
      });
      toastSuccess(toast, 'Schedule updated');
    } catch (error) {
      toastError(toast, 'Failed to update schedule');
    }
    setIsLoading(false);
  };

  const handleDeleteSchedule = async () => {
    setIsLoading(true);
    try {
      await robotApi.deleteSchedule(userId, processId, processVersion);
      toastSuccess(toast, 'Schedule deleted');
      dispatch(resetSchedule());
    } catch (error) {
      toastError(toast, 'Failed to delete schedule');
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='m-auto'>Schedule robot</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {schedule.name ? 'Edit schedule' : 'Create schedule'}
          <ScheduleForm />
        </ModalBody>
        <ModalFooter>
          {schedule.name ? (
            <>
              <Button
                className="mr-2"
                isLoading={isLoading}
                colorScheme="blue"
                onClick={handleUpdateSchedule}>
                Save
              </Button>
              <Button
                className='mr-2'
                isLoading={isLoading}
                colorScheme="red"
                onClick={handleDeleteSchedule}>
                Delete
              </Button>
            </>
          ) : (
            <Button
              className="mr-2"
              isLoading={isLoading}
              colorScheme="blue"
              onClick={handleCreateSchedule}>
              Create
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleModal;
