import React from 'react';
import {
  Flex,
  Box,
  Grid,
  GridItem,
  Heading,
  Container,
  Text,
  IconButton,
} from '@chakra-ui/react';
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

const RobotDashboard = () => {
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
