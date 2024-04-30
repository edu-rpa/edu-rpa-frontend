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
  Tag,
  useToast,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams } from 'next/navigation';
import RobotLog from '../components/Log/RobotLog';
import { LOG_ROBOT } from '@/constants/robot';

import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import ConnectionDetail from '../components/ConnectionDetail/ConnectionDetail';
import LogDetail from '../components/LogDetail/LogDetail';
import RobotDashboard from '../components/Dashboard/RobotDashboard';
import { userSelector } from '@/redux/selector';
import { useSelector } from 'react-redux';
import robotApi from '@/apis/robotApi';
import { FaPlay, FaStop } from 'react-icons/fa';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQuery } from '@tanstack/react-query';
import { mapStatus, mapStatusColor } from '@/utils/robot';

interface RobotRunningDto {
  userID: number;
  processID: string;
  version: number;
}

const RobotDetail = () => {
  const router = useRouter();
  const params = useParams();
  const user = useSelector(userSelector);
  const toast = useToast();
  const logGroup = LOG_ROBOT.FOLDER_PREFIX + router.query?.group;
  const robotID = params?.id as string;

  const segments = logGroup?.split('-');
  const processID = segments && segments.length > 4 ? segments[4] : '';
  const version =
    segments && segments.length > 5 ? parseInt(segments[5].slice(1)) : 0;

  const {
    data: robotStatus,
    isLoading: robotStatusLoading,
    refetch: refetchRobotStatus,
  } = useQuery({
    queryKey: [QUERY_KEY.ROBOT_STATUS],
    queryFn: () => robotApi.getRobotDetail(user.id, processID, version),
  });

  const handleRunRobot = useMutation({
    mutationFn: async (payload: RobotRunningDto) => {
      return await robotApi.runRobot(
        payload.userID,
        payload.processID,
        payload.version
      );
    },
    onSuccess: () => {
      toast({
        title: 'Run robot sucessfully!',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      refetchRobotStatus();
    },
    onError: () => {
      toast({
        title: 'Run robot failed !',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    },
  });

  const handleStopRobot = useMutation({
    mutationFn: async (payload: RobotRunningDto) => {
      return await robotApi.stopRobot(
        payload.userID,
        payload.processID,
        payload.version
      );
    },
    onSuccess: () => {
      toast({
        title: 'Stop robot sucessfully!',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      refetchRobotStatus();
    },
    onError: () => {
      toast({
        title: 'Stop robot failed !',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    },
  });

  if (!router.query.group || !processID || !version || robotStatusLoading) {
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
        <Text>
          <span className="font-bold">Process ID:</span> {processID}
        </Text>
        <Text>
          <span className="font-bold">Version:</span> {version}
        </Text>
      </Box>

      <Box className="flex justify-between items-center bg-teal-500 w-90 m-auto p-[20px] mb-[20px] rounded-lg">
        <Box className="flex justify-between items-center">
          <Box>
            <Tag
              colorScheme={mapStatusColor(
                robotStatus ? robotStatus.instanceState : ''
              )}
              size="md"
              p={3}
              rounded={10}>
              {robotStatus ? mapStatus(robotStatus.instanceState) : ''}
            </Tag>
            <IconButton
              bg="white"
              aria-label="Run robot"
              className="ml-[5px]"
              onClick={(e) => {
                e.stopPropagation();
                handleRunRobot.mutate({
                  userID: user.id,
                  processID: processID,
                  version: version,
                });
              }}
              icon={<FaPlay color="#319795" />}
            />
            <IconButton
              bg="white"
              aria-label="Stop robot"
              className="ml-[5px]"
              icon={<FaStop color="#319795" />}
              onClick={(e) => {
                e.stopPropagation();
                handleStopRobot.mutate({
                  userID: user.id,
                  processID: processID,
                  version: version,
                });
              }}
            />
          </Box>
          <Box></Box>
        </Box>
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
            <RobotDashboard logGroup={logGroup} />
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
