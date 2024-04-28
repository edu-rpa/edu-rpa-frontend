import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams } from 'next/navigation';
import RobotDashboard from '../components/Dashboard/RobotDashboard';
import RobotLog from '../components/Log/RobotLog';
import { LOG_ROBOT } from '@/constants/robot';
import ConnectionDetail from '../components/ConnectionDetail/ConnectionDetail';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import LogDetail from '../components/LogDetail/LogDetail';

const RobotDetail = () => {
  const router = useRouter();
  const params = useParams();
  const logGroup = LOG_ROBOT.FOLDER_PREFIX + router.query?.group;
  const robotID = params?.id as string;

  if (!router.query.group) {
    return <LoadingIndicator />;
  }

  return (
    <Box className="bg-white h-[100vh]">
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
          Robot Information
        </Heading>
        <Box></Box>
      </Box>

      <Box
        bg="gray.100"
        p={4}
        rounded="lg"
        shadow="md"
        mb={6}
        className="w-90 mx-auto my-5">
        <Text>
          <span className="font-bold">Robot ID:</span> {robotID}
        </Text>
      </Box>

      <Tabs variant="enclosed" className="w-90 m-auto">
        <TabList mb="1em">
          <Tab _selected={{ color: 'white', bg: '#319795' }}>Log</Tab>
          <Tab _selected={{ color: 'white', bg: '#319795' }}>Log Detail</Tab>
          <Tab _selected={{ color: 'white', bg: '#319795' }}>Dashboard</Tab>
          <Tab _selected={{ color: 'white', bg: '#319795' }}>Connection</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RobotLog logGroup={logGroup} />
          </TabPanel>
          <TabPanel>
            <LogDetail logGroup={logGroup} />
          </TabPanel>
          <TabPanel>
            <RobotDashboard />
          </TabPanel>
          <TabPanel>
            <ConnectionDetail robotID={robotID} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RobotDetail;
