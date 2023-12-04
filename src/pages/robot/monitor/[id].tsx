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
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams } from 'next/navigation';

const RobotMonitor = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <Container maxW="container.xl" className="bg-white h-[100vh]">
      <Box className="flex justify-between items-center w-90 m-auto">
        <IconButton
          colorScheme="teal"
          aria-label="Prev to home"
          variant="outline"
          isRound={true}
          size="lg"
          onClick={() => router.push('/robot')}
          icon={<ChevronLeftIcon />}
        />
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          color="teal"
          my={5}
          py={8}>
          Robot Monitoring Dashboard
        </Heading>
        <Box></Box>
      </Box>

      <Box
        bg="gray.100"
        p={4}
        rounded="lg"
        shadow="md"
        mb={6}
        className="w-90 m-auto">
        <Text fontSize="lg" fontWeight="bold">
          Robot Information:
        </Text>
        <Text>ID: {params.id} </Text>
      </Box>
      <Flex flexDirection="column" alignItems="center" p={4}>
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
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
      </Flex>
    </Container>
  );
};

export default RobotMonitor;
