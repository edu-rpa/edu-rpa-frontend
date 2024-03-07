import robotApi from "@/apis/robotApi";
import { Robot } from "@/interfaces/robot";
import { userSelector } from "@/redux/selector";
import { Tr, Td, Button, Tag, HStack, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { useSelector } from "react-redux";

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

interface RobotRowProps {
  data: Robot;
  onSelectedForSchedule: (userId: number, processId: string, processVersion: number) => void;
  onSelectedForRemove: (userId: number, processId: string, processVersion: number) => void;
}

export const RobotRow = (props: RobotRowProps) => {
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const user = useSelector(userSelector);
  const data = props.data;

  const handleGetStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await robotApi.geRobotDetail(user.id, data.processId, data.processVersion);
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
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleStopRobot = async () => {
    setIsLoading(true);
    try {
      await robotApi.stopRobot(user.id, data.processId, data.processVersion);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetStatus();
  }, []);

  return (
    <Tr
      _hover={{
        bg: '#4FD1C5',
        cursor: 'pointer',
        color: 'white',
        borderRadius: '15px',
      }}
    >
      {Object.keys(data).map((key, columnIndex) =>
        <Td key={key}><Text>{data[key]}</Text></Td>
      )}
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
            colorScheme={status === 'running' ? 'green' : 'gray'}
            size="md"
            p={3}
            rounded={10}>
            {status}
          </Tag>
        )}
      </Td>
      <Td>
        <HStack spacing={2}>
          {
            isLoading ? (
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
                <IconButton
                  bg="white"
                  aria-label="Schedule robot"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onSelectedForSchedule(data.userId, data.processId, data.processVersion);
                  }}
                  icon={<GrSchedule color="#319795" />}
                />
                <IconButton
                  bg="white"
                  aria-label="Remove robot"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onSelectedForRemove(data.userId, data.processId, data.processVersion);
                  }}
                  icon={<DeleteIcon color="#319795" />}
                />
              </>
            )
          }
        </HStack>
      </Td>
    </Tr>
  )
}