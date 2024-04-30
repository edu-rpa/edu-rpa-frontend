import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import logApi from '@/apis/logApi';
import Log from '@/components/Log/Log';
import RefetchBar from '../RefetchBar/RefetchBar';
import { QUERY_KEY } from '@/constants/queryKey';

interface RobotLogProps {
  logGroup: string;
}

const RobotLog = (props: RobotLogProps) => {
  const [selectedLogStream, setSelectedLogStream] = useState('test');
  const { data: logStreams, refetch: getLogStreamsRefetch } = useQuery({
    queryKey: [QUERY_KEY.LOG_STREAMS],
    queryFn: () => logApi.getStreamLogs(props.logGroup),
  });

  const { data: logStreamDetail, refetch: getLogStreamDetailRefetch } =
    useQuery({
      queryKey: [QUERY_KEY.LOG_STREAM_DETAIL],
      queryFn: () =>
        logApi.getLogStreamDetail(props.logGroup, selectedLogStream),
      enabled: selectedLogStream !== 'test',
    });

  useEffect(() => {
    if (logStreams && logStreams.length > 0 && selectedLogStream === 'test') {
      setSelectedLogStream(logStreams[0]?.logStreamName);
    }
  }, [logStreams]);

  useEffect(() => {
    if (selectedLogStream !== 'test') {
      handleRefetch();
    }
  }, [selectedLogStream]);

  const handleRefetch = () => {
    getLogStreamsRefetch();
    getLogStreamDetailRefetch();
  };

  return (
    <Box className="w-full m-auto">
      <RefetchBar
        selectedLogStream={selectedLogStream}
        setSelectedLogStream={setSelectedLogStream}
        logStreams={logStreams}
        handleRefetch={handleRefetch}
      />
      {logStreamDetail && <Log logs={logStreamDetail} />}
    </Box>
  );
};

export default RobotLog;
