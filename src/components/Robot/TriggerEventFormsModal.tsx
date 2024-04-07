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
  Switch,
  FormControl,
  FormLabel,
  Select,
  Input,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import robotApi from '@/apis/robotApi';
import { toastError, toastSuccess } from '@/utils/common';
import { EventState, TriggerType } from '@/interfaces/robot';
import connectionApi from '@/apis/connectionApi';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import { providerData } from '@/constants/providerData';
import Image from 'next/image';
import googleApi from '@/apis/googleApi';
import { GoogleForm } from '@/interfaces/google';
import { For } from '@/utils/bpmn-parser/visitor/robot';
import { FormsEventSchedule } from '@/dtos/robotDto';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  processId: string;
  processVersion: number;
}

const TriggerEventFormsModal = ({
  isOpen,
  onClose,
  userId,
  processId,
  processVersion,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState<string[]>([]);
  const [selectedConnection, setSelectedConnection] = useState('');
  const [forms, setForms] = useState<GoogleForm[]>([]);
  const [selectedForm, setSelectedForm] = useState('');
  const [enabled, setEnabled] = useState(false);

  const toast = useToast();
  const formsProvider = providerData.find(
    (provider) => provider.name === AuthorizationProvider.G_FORMS
  );
  const description = 'Configure your robot to trigger when new form submission is received';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const connections = await connectionApi.queryConnections(
          AuthorizationProvider.G_FORMS
        );
        setConnections(connections.map((item) => item.name));

        const schedule = await robotApi.getSchedule(userId, processId, processVersion);
        if (schedule.Name) {
          const input = JSON.parse(schedule.Target.Input);
          setSelectedConnection(input.connection_name);
          if (input.connection_name) {
            const forms = await googleApi.getForms(input.connection_name);
            setForms(forms);
          }
          setSelectedForm(input.form_id);
          setEnabled(schedule.State === EventState.ENABLED);
        }
      } catch (error) {
        console.log(error);
        toastError(toast, 'Failed to fetch schedule');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId, processId, processVersion]);

  useEffect(() => {
    if (selectedConnection) {
      const fetchData = async () => {
        setIsLoading(true);
        const forms = await googleApi.getForms(selectedConnection);
        setForms(forms);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [selectedConnection]);

  const handleUpsertEventSchedule = async () => {
    setIsLoading(true);
    try {
      await robotApi.upsertEventSchedule(userId, processId, processVersion, {
        type: TriggerType.EVENT_FORMS,
        connection_name: selectedConnection,
        form_id: selectedForm,
        state: enabled ? EventState.ENABLED : EventState.DISABLED,
      } as FormsEventSchedule);
      toastSuccess(toast, 'Event trigger saved');
    } catch (error) {
      toastError(toast, 'Failed to create trigger');
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className='m-auto'>Trigger robot by event</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Image className='m-auto' src={formsProvider!.icon} alt="Icon" width={50} height={50} />
          <p>{description}</p>
          <FormControl>
            <FormLabel>Connection</FormLabel>
            <Select
              value={selectedConnection}
              onChange={(e) => setSelectedConnection(e.target.value)}>
              {selectedConnection === '' && (
                <option value="" disabled>
                  Select connection
                </option>
              )}
              {connections.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Form</FormLabel>
            <Select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}>
              {selectedForm === '' && (
                <option value="" disabled>
                  Select form
                </option>
              )}
              {forms.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Enabled
            </FormLabel>
            <Switch
              id="email-alerts"
              isChecked={enabled}
              onChange={() => setEnabled(!enabled)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            className='mr-2'
            isLoading={isLoading}
            colorScheme="blue"
            onClick={handleUpsertEventSchedule}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TriggerEventFormsModal;
