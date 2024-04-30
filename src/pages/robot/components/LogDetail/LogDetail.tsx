import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Collapse,
  Tooltip,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  RepeatIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import robotReportApi from '@/apis/robotReportApi';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import { QUERY_KEY } from '@/constants/queryKey';
import logApi from '@/apis/logApi';
import RefetchBar from '../RefetchBar/RefetchBar';

const formatTime = (timeString) => new Date(timeString).toLocaleString();

interface LogDetailProps {
  logGroup: string;
}

export default function LogDetail(props: LogDetailProps) {
  const [expandedLogId, setExpandedLogId] = useState('');
  const logGroup = props.logGroup;
  const segments = logGroup?.split('-');
  const processID = segments && segments.length > 4 ? segments[4] : '';
  const version =
    segments && segments.length > 5 ? parseInt(segments[5].slice(1)) : 0;

  const [selectedLogStream, setSelectedLogStream] = useState('test');

  const { data: logStreams, refetch: getLogStreamsRefetch } = useQuery({
    queryKey: [QUERY_KEY.LOG_STREAMS],
    queryFn: () => logApi.getStreamLogs(props.logGroup),
  });

  useEffect(() => {
    if (logStreams && logStreams.length > 0 && selectedLogStream == 'test') {
      setSelectedLogStream(logStreams[0]?.logStreamName);
    }
  }, [logStreams]);

  useEffect(() => {
    handleRefetch();
  }, [selectedLogStream]);

  const handleRefetch = () => {
    getLogStreamsRefetch();
    refetchLogRobotDetail();
  };

  const { data: logRobotDetail, refetch: refetchLogRobotDetail } = useQuery({
    queryKey: [QUERY_KEY.ROBOT_REPORT_DETAIL],
    queryFn: () =>
      robotReportApi.getRobotLogDetail(
        selectedLogStream.replace('stream_', ''),
        processID,
        version
      ),
    enabled: selectedLogStream != 'test',
  });

  const handleToggle = (logId: any) => {
    setExpandedLogId(expandedLogId === logId ? '' : logId);
  };

  const getStatusBadgeColor = (status: any) => {
    switch (status) {
      case 'PASS':
        return 'green';
      case 'FAIL':
        return 'red';
      case 'NOT RUN':
        return 'yellow';
      default:
        return 'blue';
    }
  };

  useEffect(() => {
    if (selectedLogStream !== 'test') {
      handleRefetch();
    }
  }, [selectedLogStream]);

  return (
    <Box>
      <RefetchBar
        selectedLogStream={selectedLogStream}
        setSelectedLogStream={setSelectedLogStream}
        logStreams={logStreams}
        handleRefetch={handleRefetch}
      />
      {logStreams && (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Log ID</Th>
              <Th>Step Name</Th>
              <Th>Arguments</Th>
              <Th>Status</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Elapsed Time</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logRobotDetail &&
              logRobotDetail?.map((log) => (
                <React.Fragment key={log.kw_id + Math.random()}>
                  <Tr>
                    <Td>{log.kw_id}</Td>
                    <Td>{log.kw_name}</Td>
                    <Td maxWidth={200}>{log.kw_args}</Td>
                    <Td>
                      <Badge
                        className="px-[20px] py-3 text-center"
                        style={{ borderRadius: '10px', width: 80 }}
                        colorScheme={getStatusBadgeColor(log.kw_status)}>
                        {log.kw_status}
                      </Badge>
                    </Td>
                    <Td>{formatTime(log.start_time)}</Td>
                    <Td>{formatTime(log.end_time)}</Td>
                    <Td>{log.elapsed_time} seconds</Td>
                    <Td>
                      <Tooltip label="Toggle Details">
                        <IconButton
                          aria-label="Toggle Details"
                          backgroundColor={
                            expandedLogId === log.kw_id ? 'gray.200' : 'white'
                          }
                          icon={
                            expandedLogId === log.kw_id ? (
                              <ChevronUpIcon />
                            ) : (
                              <ChevronDownIcon />
                            )
                          }
                          onClick={() => handleToggle(log.kw_id)}
                        />
                      </Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={8}>
                      <Collapse in={expandedLogId === log.kw_id}>
                        <Box p={4} className="text-red-500 bg-gray-100">
                          {log.robot_run_detail_messages ||
                            'No additional messages.'}
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                </React.Fragment>
              ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
