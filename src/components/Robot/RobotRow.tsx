import robotApi from '@/apis/robotApi';
import { Robot, TriggerType } from '@/interfaces/robot';
import { userSelector } from '@/redux/selector';
import {
  Tr,
  Td,
  Button,
  Tag,
  HStack,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { toastError, toastSuccess } from '@/utils/common';
import { useRouter } from 'next/router';
import { LOG_ROBOT } from '@/constants/robot';

const mapStatus = (status: string) => {
  switch (status) {
    case 'not running':
    case 'stopped':
    case 'pending':
      return 'not running';
    case 'running':
      return 'running';
    case 'stopping':
      return 'stopping';
    default:
      return 'not running';
  }
};

const mapStatusColor = (status: string) => {
  switch (status) {
    case 'not running':
    case 'stopped':
      return 'gray';
    case 'running':
      return 'green';
    case 'stopping':
    case 'pending':
      return 'yellow';
    default:
      return 'gray';
  }
};

interface RobotRowProps {
  data: Omit<Robot, 'userId'>;
  onSelectedForConfigTrigger: (
    userId: number,
    processId: string,
    processVersion: number,
    triggerType: TriggerType
  ) => void;
  onSelectedForRemove: (
    userId: number,
    processId: string,
    processVersion: number
  ) => void;
}

const RobotRow = (props: RobotRowProps) => {
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const user = useSelector(userSelector);
  const data = props.data;
  const toast = useToast();
  const router = useRouter();

  const handleGetStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await robotApi.getRobotDetail(
        user.id,
        data.processId,
        data.processVersion
      );
      setStatus(mapStatus(res.instanceState));
    } catch (error) {
      setStatus('');
    }
    setIsLoadingStatus(false);
  };

  const handleRunRobot = async () => {
    setIsLoading(true);
    try {
      await robotApi.runRobot(user.id, data.processId, data.processVersion);
      setStatus('pending');
      toastSuccess(toast, 'Run robot successfully');
    } catch (error) {
      console.log(error);
      toastError(toast, 'Run robot failed');
    }
    setIsLoading(false);
  };

  const handleStopRobot = async () => {
    setIsLoading(true);
    try {
      await robotApi.stopRobot(user.id, data.processId, data.processVersion);
      setStatus('stopping');
      toastSuccess(toast, 'Stop robot successfully');
    } catch (error) {
      console.log(error);
      toastError(toast, 'Stop robot failed');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetStatus();
  }, []);

  return (
    <Tr
      onClick={() => {
        const logGroup = `${LOG_ROBOT.EDU_RPA_ROBOT}-${user.id}-${props.data.processId}-v${props.data.processVersion}`;
        router.push(`/robot/detail/${logGroup}`);
      }}
      _hover={{
        bg: '#4FD1C5',
        cursor: 'pointer',
        color: 'white',
        borderRadius: '15px',
      }}>
      {data &&
        Object.keys(data).map((key, columnIndex) => (
          <Td key={key}>
            <Text>{data[key]}</Text>
          </Td>
        ))}
      <Td>
        {isLoadingStatus ? (
          <Button
            isLoading
            loadingText="Loading"
            colorScheme="teal"
            variant="outline"
            size="sm"
            onClick={handleGetStatus}>
            Loading
          </Button>
        ) : (
          <Tag
            colorScheme={mapStatusColor(status)}
            size="md"
            p={3}
            rounded={10}>
            {status}
          </Tag>
        )}
      </Td>
      <Td>
        <HStack spacing={2}>
          {isLoading ? (
            <Button
              isLoading
              loadingText="Running"
              colorScheme="teal"
              variant="outline"
              size="sm">
              Run
            </Button>
          ) : (
            <>
              <IconButton
                bg="white"
                aria-label="Run robot"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRunRobot();
                }}
                icon={<FaPlay color="#319795" />}
              />
              <IconButton
                bg="white"
                aria-label="Stop robot"
                icon={<FaStop color="#319795" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStopRobot();
                }}
              />
              {data.triggerType !== TriggerType.MANUAL && (
                <IconButton
                  bg="white"
                  aria-label="Configure trigger robot"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onSelectedForConfigTrigger(
                      user.id,
                      data.processId,
                      data.processVersion,
                      data.triggerType
                    );
                  }}
                  icon={<IoMdSettings color="#319795" />}
                />
              )}

              <IconButton
                bg="white"
                aria-label="Remove robot"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onSelectedForRemove(
                    user.id,
                    data.processId,
                    data.processVersion
                  );
                }}
                icon={<DeleteIcon color="#319795" />}
              />
            </>
          )}
        </HStack>
      </Td>
    </Tr>
  );
};
export default RobotRow;
