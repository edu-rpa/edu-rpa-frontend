import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  IconButton,
  Select,
  InputLeftElement,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import Log from '@/components/Log/Log';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import logApi from '@/apis/logApi';
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons';

interface RobotLogProps {
  logGroup: string;
}

const RobotLog = (props: RobotLogProps) => {
  const [selectedLogStream, setSelectedLogStream] = useState('');
  const [isRefetch, setIsRefetch] = useState(false);

  const { data: logStreams, refetch: getLogStreamsRefetch } = useQuery({
    queryKey: [QUERY_KEY.LOG_STREAMS],
    queryFn: () => logApi.getStreamLogs(props.logGroup),
  });

  const { data: logStreamDetail, refetch: getLogStreamDetailRefetch } =
    useQuery({
      queryKey: [QUERY_KEY.LOG_STREAM_DETAIL],
      queryFn: () =>
        logApi.getLogStreamDetail(props.logGroup, selectedLogStream),
      enabled: !!selectedLogStream,
    });

  useEffect(() => {
    setSelectedLogStream(logStreams?.[0].logStreamName);
  }, [logStreams]);

  const handleRefetch = () => {
    setIsRefetch(!isRefetch);
    getLogStreamsRefetch();
    getLogStreamDetailRefetch();
  };

  return (
    <Box className="w-full m-auto">
      <Box className="flex justify-between my-5">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input bg="white.300" type="text" placeholder="Search..." />
        </InputGroup>
        <Select
          size="md"
          className="mx-3"
          value={selectedLogStream}
          onChange={(e) => {
            setSelectedLogStream(e.target.value);
          }}>
          {logStreams?.length > 0 &&
            logStreams.map((stream) => (
              <option key={stream.logStreamName} value={stream.logStreamName}>
                {new Date(stream.lastEventTime).toLocaleString()}
              </option>
            ))}
        </Select>
        <IconButton
          aria-label="Refresh"
          icon={<RepeatIcon />}
          onClick={handleRefetch}
          className="ml-5"
        />
      </Box>
      {logStreamDetail && <Log logs={logStreamDetail} />}
    </Box>
  );
};

export default RobotLog;
