import React from 'react';
import { Box, Text, VStack, Container } from '@chakra-ui/react';
import { LogMessage } from '@/types/log';

interface LogProps {
  messages: LogMessage[];
}

const Log: React.FC<LogProps> = ({ messages }) => {
  const getColorScheme = (type: 'success' | 'error' | 'info' | 'warning') => {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'info':
        return 'blue';
      case 'warning':
        return 'yellow';
      default:
        return 'gray';
    }
  };

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
        {messages.map((message, index) => (
          <Box
            key={index}
            p={3}
            bg={`${getColorScheme(message.type)}.100`}
            borderRadius="md">
            <Text fontSize="md" color={`${getColorScheme(message.type)}.800`}>
              {message.type}: {message.text}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Log;
