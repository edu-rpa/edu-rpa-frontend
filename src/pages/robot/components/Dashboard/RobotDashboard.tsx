import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@chakra-ui/react';
import LineChart from '@/components/Chart/LineChart';
import BarChart from '@/components/Chart/BarChart';
import PieChart from '@/components/Chart/PieChart';
import RadarChart from '@/components/Chart/RadarChart';
import PolarAreaChart from '@/components/Chart/PolarAreaChart';
import DoughnutChart from '@/components/Chart/DoughnutChart';
import robotReportApi from '@/apis/robotReportApi';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import RefetchBar from '../RefetchBar/RefetchBar';
import logApi from '@/apis/logApi';
import { RepeatIcon } from '@chakra-ui/icons';
import MockDataSet from '@/components/Chart/dataset';
import { formatDateTime } from '@/utils/time';
import {
  BarChartData,
  LineChartData,
  PieChartData,
} from '../../../../utils/genDataSet';
import { addHours, format } from 'date-fns';

interface RobotDashboardProps {
  logGroup: string;
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

  const handleRefetch = () => {
    refetchReportOverall();
    refetchReportAverageTime();
    refetchReportGroupPassed();
    refetchReportGroupError();
  };

  const lineChartData =
    robotReportOverall &&
    LineChartData(
      'Robot Time Execution',
      robotReportOverall?.map((item) => formatDateTime(item.start_time, 7)),
      robotReportOverall?.map((item) => item.time_execution)
    );

  const pieChartData =
    robotReportGroupPassed &&
    PieChartData(
      'Success Rate',
      ['Pass', 'Fail'],
      robotReportGroupPassed.map((item) => item.count)
    );

  const barChartData =
    robotReportGroupError &&
    BarChartData(
      'Error Rate',
      robotReportGroupError.map((item) => item.error_message),
      robotReportGroupError.map((item) => item.count)
    );

  return (
    <Box>
      <IconButton
        aria-label="Refresh"
        icon={<RepeatIcon />}
        onClick={handleRefetch}
        className="my-[5px]"
      />
      <Grid templateColumns={['repeat(2, 1fr)']} gap={6}>
        <GridItem>
          <Box bg="white" p={4} rounded="lg" shadow="md">
            <LineChart data={lineChartData ?? MockDataSet.lineChartData} />
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
            h="100%">
            <Text className="font-bold text-2xl">Average Time</Text>
            <Text className="text-2xl">
              {robotReportAverageTime?.avg_time_execution
                ? `${robotReportAverageTime?.avg_time_execution} s`
                : '0 s'}
            </Text>
          </Box>
        </GridItem>

        <GridItem>
          <Box bg="white" p="4" rounded="lg" shadow="md">
            <PieChart data={pieChartData ?? MockDataSet.pieChartData} />
          </Box>
        </GridItem>

        <GridItem>
          <Box bg="white" p="4" rounded="lg" shadow="md">
            <BarChart data={barChartData ?? MockDataSet.barChartData} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RobotDashboard;
