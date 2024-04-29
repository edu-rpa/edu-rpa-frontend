import React, { lazy, useEffect, useState } from 'react';
import {
  Box,
  Heading,
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
import RobotLog from '../components/Log/RobotLog';
import { LOG_ROBOT } from '@/constants/robot';

import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
const ConnectionDetail = lazy(
  () => import('../components/ConnectionDetail/ConnectionDetail')
);
const RobotDashboard = lazy(
  () => import('../components/Dashboard/RobotDashboard')
);
const LogDetail = lazy(() => import('../components/LogDetail/LogDetail'));

const RobotDetail = () => {
  const router = useRouter();
  const params = useParams();
  const logGroup = LOG_ROBOT.FOLDER_PREFIX + router.query?.group;
  const robotID = params?.id as string;

  if (!router.query.group) {
    return <LoadingIndicator />;
  }

  const [tabIndex, setTabIndex] = useState(0);

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

      <Tabs
        variant="enclosed"
        className="w-90 m-auto"
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}>
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
            <LogDetail tabIndex={tabIndex} logGroup={logGroup} />
          </TabPanel>
          <TabPanel>
            <RobotDashboard tabIndex={tabIndex} />
          </TabPanel>
          <TabPanel>
            <ConnectionDetail tabIndex={tabIndex} robotID={robotID} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RobotDetail;
