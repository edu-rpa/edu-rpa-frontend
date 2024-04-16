import { TriggerType } from "@/interfaces/robot";
import { 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  FormControl, 
  FormLabel, 
  Select, 
  ModalFooter, 
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { toastSuccess, toastError } from "@/utils/common";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { CreateRobotDto } from "@/dtos/robotDto";
import robotApi from "@/apis/robotApi";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";

interface Props {
  processID: string;
  genRobotCode: any;
  onSaveAll: any;
  onClose: () => void;
}

export const PublishRobotModal = (props: Props) => {
  const [robotName, setRobotName] = useState('');
  const [triggerType, setTriggerType] = useState<TriggerType>(TriggerType.MANUAL);
  const toast = useToast();
  const router = useRouter();

  const handleCreateRobotWithApi = useMutation({
    mutationFn: async (payload: CreateRobotDto) => {
      return await robotApi.createRobot(payload);
    },
    onSuccess: () => {
      toastSuccess(toast, 'Create robot successfully!');
      router.push('/robot');
    },
    onError: () => {
      toastError(toast, 'Create robot failed!');
    },
  });

  const handlePublishRobot = async () => {
    try {
      const robotCode = await props.genRobotCode(props.processID);

      const publishPayload = {
        name: robotName,
        processId: props.processID as string,
        code: JSON.stringify(robotCode),
        providers: ["Google Drive"],
        triggerType: triggerType,
      };
      handleCreateRobotWithApi.mutate(publishPayload);
    } catch (error) {
      console.error('Error in publishing:', error);
    }
  };

  if (handleCreateRobotWithApi.isPending) {
    return <LoadingIndicator />;
  }

  return (
    <ModalContent>
      <ModalHeader>Publish Robot</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Robot name</FormLabel>
          <Input 
            value={robotName} 
            placeholder="Your robot name" 
            onChange={(e) => setRobotName(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Process ID</FormLabel>
          <Input
            placeholder="Process ID"
            disabled={true}
            backgroundColor="gray.200"
            value={props.processID}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Trigger type</FormLabel>
          <Select
            value={triggerType}
            onChange={(e) => setTriggerType(e.target.value as TriggerType)}>
            <option value={TriggerType.MANUAL}>Manual</option>
            <option value={TriggerType.SCHEDULE}>Schedule</option>
            <option value={TriggerType.EVENT_GMAIL}>New emails (Gmail)</option>
            <option value={TriggerType.EVENT_DRIVE}>New files (Google Drive)</option>
            <option value={TriggerType.EVENT_FORMS}>New forms (Google Forms)</option>
          </Select>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} colorScheme="teal" variant="outline" onClick={props.onClose}>
          Cancel
        </Button>
        <Button
          colorScheme="teal"
          onClick={handlePublishRobot}>
          Publish
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};