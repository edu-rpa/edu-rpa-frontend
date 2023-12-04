import React from 'react';
import { Box, Text, VStack, Container } from '@chakra-ui/react';

interface LogMessage {
  type: 'success' | 'error';
  text: string;
}

interface LogProps {
  messages: LogMessage[];
}

const Log: React.FC<LogProps> = ({ messages }) => {
  const getColorScheme = (type: 'success' | 'error') => {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
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
        boxShadow="md">
        {messages.map((message, index) => (
          <Box
            key={index}
            p={3}
            bg={`${getColorScheme(message.type)}.100`}
            borderRadius="md">
            <Text fontSize="md" color={`${getColorScheme(message.type)}.800`}>
              {message.text}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Log;
