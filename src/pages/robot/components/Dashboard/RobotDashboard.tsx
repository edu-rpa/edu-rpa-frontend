import React from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
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

interface RobotDashboardProps {
  tabIndex?: number;
}

const RobotDashboard = (props: RobotDashboardProps) => {
  const { data: robotReportOverall, refetch: refetchReportOverall } = useQuery({
    queryKey: [QUERY_KEY.ROBOT_REPORT_OVERALL],
    queryFn: () => robotReportApi.getReportOverall('Process_94XTLQD', 1, 0),
  });

  const { data: robotReportAverageTime, refetch: refetchReportAverageTime } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_AVERAGE_TIME],
      queryFn: () =>
        robotReportApi.getReportAverageTime('Process_94XTLQD', 1, 0),
    });

  const { data: robotReportGroupPassed, refetch: refetchReportGroupPassed } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_GROUP_PASSED],
      queryFn: () => robotReportApi.getReportGroupPassed('Process_94XTLQD', 1),
    });

  const { data: robotReportGroupError, refetch: refetchReportGroupError } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_GROUP_ERROR],
      queryFn: () => robotReportApi.getReportGroupError('Process_94XTLQD', 1),
    });

  const { data: robotReportFailures, refetch: refetchReportFailures } =
    useQuery({
      queryKey: [QUERY_KEY.ROBOT_REPORT_DETAIL_FAILURES],
      queryFn: () =>
        robotReportApi.getReportDetailFailures('Process_94XTLQD', 1),
    });

  function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().replace('T', ' ').slice(0, 19);
  }

  return (
    <Box>
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}>
        <GridItem>
          <Box bg="white" p={4} rounded="lg" shadow="md">
            <LineChart data={lineChartData} />
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
