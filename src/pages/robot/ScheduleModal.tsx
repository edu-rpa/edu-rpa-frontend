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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import robotApi from "@/apis/robotApi";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import { ScheduleForm } from "./ScheduleForm";
import { useSelector, useDispatch } from "react-redux";
import { scheduleSelector } from "@/redux/selector";
import { 
  ScheduleState, 
  setSchedule, 
  setScheduleName, 
  resetSchedule,
} from "@/redux/slice/scheduleSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  processId: string;
  processVersion: number;
}

const generateExpression = (schedule: ScheduleState) => {
  if (schedule.type === 'at') {
    return `at(${schedule.datetime}:00)`
  }

  return `cron(${schedule.minute} ${schedule.hour} ${schedule.dayOfMonth} ${schedule.month} ${schedule.dayOfWeek} ${schedule.year})`;
}

export const ScheduleModal = ({
  isOpen,
  onClose,
  userId,
  processId,
  processVersion,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  
  const schedule = useSelector(scheduleSelector);
  const dispatch = useDispatch();
  const toast = useToast();

  const toastError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const toastSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await robotApi.getSchedule(userId, processId, processVersion);
        if (res.Name) {
          dispatch(setSchedule(res));
        }
      } catch (error) {
        toastError('Failed to fetch schedule');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId, processId, processVersion]);

  const handleCreateSchedule = async () => {
    setIsLoadingAction(true);
    try {
      await robotApi.createSchedule(userId, processId, processVersion, {
        schedule_expression: generateExpression(schedule),
        schedule_expression_timezone: schedule.timezone,
      });
      toastSuccess('Schedule created');
      dispatch(setScheduleName(`edu-rpa-robot-schedule.${userId}.${processId}.${processVersion}`));
    } catch (error) {
      toastError('Failed to create schedule');
    }
    setIsLoadingAction(false);
  };

  const handleUpdateSchedule = async () => {
    setIsLoadingAction(true);
    try {
      await robotApi.updateSchedule(userId, processId, processVersion, {
        schedule_expression: generateExpression(schedule),
        schedule_expression_timezone: schedule.timezone,
      });
      toastSuccess('Schedule updated');
    } catch (error) {
      toastError('Failed to update schedule');
    }
    setIsLoadingAction(false);
  };

  const handleDeleteSchedule = async () => {
    setIsLoadingAction(true);
    try {
      await robotApi.deleteSchedule(userId, processId, processVersion);
      toastSuccess('Schedule deleted');
      dispatch(resetSchedule());
    } catch (error) {
      toastError('Failed to delete schedule');
    }
    setIsLoadingAction(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Schedule robot</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {
            isLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                {schedule.name? 'Edit schedule': 'Create schedule'}
                <ScheduleForm />
              </>
            )
          }
        </ModalBody>
        <ModalFooter>
          {
            schedule.name ? (
              <>
                <Button isLoading={isLoadingAction} colorScheme="blue" onClick={handleUpdateSchedule}>Save</Button>
                <Button isLoading={isLoadingAction} colorScheme="red" onClick={handleDeleteSchedule}>Delete</Button>
              </>
            ) : (
              <Button isLoading={isLoadingAction}  colorScheme="blue" onClick={handleCreateSchedule}>Create</Button>
            )
          }
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

