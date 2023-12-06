import React from 'react';
import { Box, Heading, Container, Text, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams } from 'next/navigation';
import { LogMessage } from '@/types/log';
import Log from '@/components/Log/Log';

const RobotExecution = () => {
  const router = useRouter();
  const params = useParams();
  const logMessages: LogMessage[] = [
    { type: 'success', text: 'Compilation completed successfully.' },
    { type: 'error', text: 'Syntax error in line 23.' },
    { type: 'info', text: 'Application started.' },
    { type: 'warning', text: 'Low disk space detected.' },
    { type: 'success', text: 'File saved successfully.' },
    { type: 'error', text: 'Invalid input data.' },
    { type: 'info', text: 'User logged in.' },
    { type: 'warning', text: 'Network connection lost.' },
    { type: 'success', text: 'Data synchronization completed.' },
    { type: 'error', text: 'Database connection failed.' },
    { type: 'info', text: 'New user registered.' },
    { type: 'warning', text: 'Battery level is low.' },
    { type: 'success', text: 'Settings saved.' },
    { type: 'error', text: 'Server error encountered.' },
    { type: 'info', text: 'Application updated.' },
  ];

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
          Robot Execution
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
        <Text>ID: {params && params.id} </Text>
      </Box>
      <Box className="w-90 m-auto">
        <Log messages={logMessages} />
      </Box>
    </Container>
  );
};

export default RobotExecution;
