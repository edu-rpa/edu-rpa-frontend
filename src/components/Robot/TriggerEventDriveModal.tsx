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
import { FilterEventSchedule } from '@/dtos/robotDto';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  processId: string;
  processVersion: number;
}

const MIME_TYPES = {
  'application/vnd.google-apps.form': 'Google Forms',
  'application/vnd.google-apps.document': 'Google Docs',
  'application/vnd.google-apps.spreadsheet': 'Google Sheets',
  'application/vnd.google-apps.presentation': 'Google Slides',
  'application/vnd.google-apps.folder': 'Google Drive Folder',
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'application/pdf': 'PDF',
};

const TriggerEventDriveModal = ({
  isOpen,
  onClose,
  userId,
  processId,
  processVersion,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState<string[]>([]);
  const [selectedConnection, setSelectedConnection] = useState('');
  const [filterFile, setFilterFile] = useState({
    name: '',
    mime_type: '',
  });
  const [enabled, setEnabled] = useState(false);

  const toast = useToast();
  const driveProvider = providerData.find(
    (provider) => provider.name === AuthorizationProvider.G_DRIVE
  );
  const description = 'Configure your robot to trigger when new files/folders are added to your Google Drive';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const connections = await connectionApi.queryConnections(
          AuthorizationProvider.G_DRIVE
        );
        setConnections(connections.map((item) => item.name));

        const schedule = await robotApi.getSchedule(userId, processId, processVersion);
        if (schedule.Name) {
          const input = JSON.parse(schedule.Target.Input);
          setSelectedConnection(input.connection_name);
          setFilterFile(input.filter);
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

  const handleUpsertEventSchedule = async () => {
    setIsLoading(true);
    try {
      await robotApi.upsertEventSchedule(userId, processId, processVersion, {
        type: TriggerType.EVENT_DRIVE,
        connection_name: selectedConnection,
        filter: filterFile,
        state: enabled ? EventState.ENABLED : EventState.DISABLED,
      } as FilterEventSchedule);
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
          <Image className='m-auto' src={driveProvider!.icon} alt="Icon" width={50} height={50} />
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
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={filterFile.name}
              onChange={(e) => setFilterFile({ ...filterFile, name: e.target.value })}
              placeholder="Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              value={filterFile.mime_type}
              onChange={(e) => setFilterFile({ ...filterFile, mime_type: e.target.value })}>
              {filterFile.mime_type === '' && (
                <option value="" disabled>
                  Select type
                </option>
              )}
              {Object.entries(MIME_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
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

export default TriggerEventDriveModal;
