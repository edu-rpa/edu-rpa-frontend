import React from 'react';
import { Box, Text, VStack, Container } from '@chakra-ui/react';
import { LogEvent } from '@/interfaces/log';

interface LogProps {
  logs: LogEvent[];
}

const Log = (props: LogProps) => {
  return (
    <Container maxW="full" p={0}>
      <VStack
        spacing={4}
        align="stretch"
        bg="gray.100"
        p={5}
        borderRadius="md"
        boxShadow="md"
        maxHeight="500px"
        overflowY="auto">
        {props.logs.map((log, index) => (
          <Box key={index} p={3} borderRadius="md" bg={'white'}>
            <Text fontSize="md">
              <span className="text-primary font-bold">
                {new Date(log.timestamp).toLocaleString()}
              </span>
              : {log.message}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Log;
