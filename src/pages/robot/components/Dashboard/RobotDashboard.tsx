import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import LineChart from '@/components/Chart/LineChart';
import BarChart from '@/components/Chart/BarChart';
import PieChart from '@/components/Chart/PieChart';
import RadarChart from '@/components/Chart/RadarChart';
import PolarAreaChart from '@/components/Chart/PolarAreaChart';
import DoughnutChart from '@/components/Chart/DoughnutChart';
import {
  lineChartData,
  barChartData,
  pieChartData,
  radarChartData,
  polarAreaChartData,
  doughnutChartData,
} from '@/components/Chart/dataset';
import robotReportApi from '@/apis/robotReportApi';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import RefetchBar from '../RefetchBar/RefetchBar';
import logApi from '@/apis/logApi';

interface RobotDashboardProps {
  logGroup: string;
  tabIndex?: number;
}

const RobotDashboard = (props: RobotDashboardProps) => {
  const logGroup = props.logGroup;
  const segments = logGroup?.split('-');
  const processID = segments && segments.length > 4 ? segments[4] : '';
  const version =
    segments && segments.length > 5 ? parseInt(segments[5].slice(1)) : 0;

  const { data: robotReportOverall, refetch: refetchReportOverall } = useQuery({
    queryKey: [QUERY_KEY.ROBOT_REPORT_OVERALL],
    queryFn: () => robotReportApi.getReportOverall(processID, version),
  });

  const { data: robotReportAverageTime, refetch: refetchReportAverageTime } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_AVERAGE_TIME],
      queryFn: () => robotReportApi.getReportAverageTime(processID, version),
    });

  const { data: robotReportGroupPassed, refetch: refetchReportGroupPassed } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_GROUP_PASSED],
      queryFn: () => robotReportApi.getReportGroupPassed(processID, version),
    });

  const { data: robotReportGroupError, refetch: refetchReportGroupError } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_GROUP_ERROR],
      queryFn: () => robotReportApi.getReportGroupError(processID, version),
    });

  const { data: robotReportFailures, refetch: refetchReportFailures } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_DETAIL_FAILURES],
      queryFn: () => robotReportApi.getReportDetailFailures(processID, version),
    });

  function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().replace('T', ' ').slice(0, 19);
  }

  useEffect(() => {
    refetchReportOverall();
    refetchReportAverageTime();
    refetchReportGroupPassed();
    refetchReportGroupError();
    refetchReportFailures();
  }, [props.tabIndex]);

  const [selectedLogStream, setSelectedLogStream] = useState('test');
  const { data: logStreams, refetch: getLogStreamsRefetch } = useQuery({
    queryKey: ['LOG_STREAMS'],
    queryFn: () => logApi.getStreamLogs(props.logGroup),
  });

  useEffect(() => {
    if (logStreams && logStreams.length > 0 && selectedLogStream === 'test') {
      setSelectedLogStream(logStreams[0]?.logStreamName);
    }
  }, [logStreams]);

  const handleRefetch = () => {
    getLogStreamsRefetch();
  };

  return (
    <Box>
      <RefetchBar
        selectedLogStream={selectedLogStream}
        setSelectedLogStream={setSelectedLogStream}
        logStreams={logStreams}
        handleRefetch={handleRefetch}
      />
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}>
        <GridItem>
          <Box bg="white" p={4} rounded="lg" shadow="md">
            <LineChart data={lineChartData} />
          </Box>
        </GridItem>
        <GridItem>
          <Box
            bg="white"
            p={4}
            rounded="md"
            shadow="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="50%">
            <Text fontSize="lg">Average Time</Text>
            <Text fontSize="xl">
              {robotReportAverageTime?.avg_time_execution
                ? `${robotReportAverageTime?.avg_time_execution} s`
                : '0 s'}
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg="white" p="4" rounded="lg" shadow="md">
            <BarChart data={barChartData} />
          </Box>
        </GridItem>

        <GridItem>
          <Box bg="white" p="4" rounded="lg" shadow="md">
            <PieChart data={pieChartData} />
          </Box>
        </GridItem>

        <GridItem>
          <Box bg="white" p="4" rounded="lg" shadow="md">
            <RadarChart data={radarChartData} />
          </Box>
        </GridItem>

        <GridItem>
          <Box bg="white" p="4" rounded="lg" shadow="md">
            <PolarAreaChart data={polarAreaChartData} />
          </Box>
        </GridItem>

        <GridItem>
          <Box bg="white" p="4" rounded="lg" shadow="md">
            <DoughnutChart data={doughnutChartData} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RobotDashboard;
